const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const User = mongoose.model('User');
const daySummary = mongoose.model('DaySummaries');
const events = require('../../client/Events');
const {config} = global;
const moment = require('moment');
const hashPass = (text, salt = '') => require('crypto').createHash(config.hash.encryptionType).update(salt + text).digest('hex'); // eslint-disable-line
const userExcludeFields = {
  'password': 0,
  'createdAt': 0,
  'updatedAt': 0,
  'rights': 0,
};

exports.register = async ({
  login,
  password,
  description,
  displayName,
  department,
  rights
}, cb) => {
  try {
    let message = 'User [ ' + login + ' ] registered successfully!';

    if (login.length < 2) {
      message = 'Login must be atleast 2 characters long.';
      cb({ eventName: events.user.register_err, message });
      return;
    };
    if (password.length < 6) {
      message = 'Password must be atleast 6 characters long.';
      cb({ eventName: events.user.register_err, message });
      return;
    }
    const userExists = await User.findOne({ login });

    if (userExists) {
      message = 'User with same login already exits.';
      cb({ eventName: events.user.register_err, message });
      return;
    };

    const user = new User({
      login,
      password: hashPass(password, config.salt),
      description: description ? description : undefined,
      displayName: displayName ? displayName : undefined,
      department: department ? department : undefined,
      rights: rights ? rights : undefined,
    });

    await user.save();
    cb({ eventName: events.user.register_success, message });
  } catch (err) {
    console.error(err);
    cb({ eventName: events.user.register_err, err });
  }
};

exports.edit = async ({
  _id,
  login,
  password,
  description,
  displayName,
  department,
  rights
}, cb) => {
  try {
    let message = 'User [ ' + login + ' ] edited successfully!';
    let pswd = undefined;

    if (login.length < 2) {
      message = 'Login must be atleast 2 characters long.';
      cb({ eventName: events.user.edit_err, message });
      return;
    };
    if(password) {
      if (password.length < 6) {
        message = 'Password must be atleast 6 characters long.';
        cb({ eventName: events.user.edit_err, message });
        return;
      }
      pswd = hashPass(password, config.salt);
    }
    if(!!!rights) {
      message = 'Rigths must be presented.';
      cb({ eventName: events.user.edit_err, message });
      return;
    }
    const user = {
      login,
      rights: rights,
      description: description,
      displayName: displayName,
      department: department,
    };

    if(pswd) user.password = pswd;

    await User.updateOne({_id},user);
    cb({ eventName: events.user.edit_success, message });
  } catch (err) {
    console.error(err);
    cb({ eventName: events.user.edit_err, err });
  }
};

exports.delete = async ({_id,login}, cb) => {
  try {
    await User.deleteOne({_id});
    const message = 'User [ ' + login + ' ] deleted successfully!';

    cb({ eventName: events.user.delete_success, message });
  } catch (err) {
    console.error(err);
    cb({ eventName: events.user.delete_err, err });
  }
};

exports.login = async ({login,password}) => {
  try {
    const user = await User.findOne({
      login,
      password: hashPass(password, config.salt),
    });

    if (user) {
      user.lastActive = new Date();
      user.save();
    }

    return user;
  } catch (err) {
    console.error(err);
    cb({ eventName: events.user.register_err, err });
  }
};

exports.updateStatus = async userId => {
  try {
    const user = await User.findOne({ _id: new ObjectId(userId)});

    if (user) {
      user.lastActive = new Date();
      user.save();
    } else {
      console.log('updateStatus');
      throw `Can't find user`;
    }
  } catch (err) {
    console.error(err);
  }
};

exports.listDepartmentsBySliceOfDate = async date => {
  try {
    const dateObj = moment(date).locale('ru').utcOffset(0);
    const user = await User.find({},userExcludeFields);

    if (user) {
      const summariesExcludeFields = {
        'summariesDateStr': 0,
        // 'summaries': 0,
        'createdAt': 0,
        'updatedAt': 0,
        'version': 0,
        'userId': 0,
        '__v': 0,
      };
      // get departments
      const usersDepartment = user.map(u => u.department && ({ id: u.id, department: u.department, })).filter(v => v);
      const startWeek = dateObj.startOf('week').set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toDate();
      const endWeek = dateObj.endOf('week').set({ hour: 23, minute: 59, second: 59, millisecond: 0 }).toDate();
      const resultArray = []; // array of departments
      let today;

      // get today
      if(moment(new Date()).locale('ru').isBetween(startWeek,endWeek,undefined,'[]')) {
        // resultArray[i].today = moment(date).locale('ru').weekday();
        today = moment(date).locale('ru').weekday();
      }
      for (let i = 0; i < usersDepartment.length; i++) {
        let usr = usersDepartment[i];
        const query = {
          userId: new ObjectId(usr.id),
          summariesDate: {
            $gt: startWeek,
            $lt: endWeek
          },
        };

        // get summaries by user and selected week
        const summariesIdFromDates = await daySummary.find(query,summariesExcludeFields);
        const daysArray = new Array(7).fill('');

        usr = {...usr, id: i+1, userId: usr.id};

        // FILL days from week
        for (let j = 0; j < summariesIdFromDates.length; j++) {
          const summaryByDate = summariesIdFromDates[j];
          const summaryWeekDay = moment(summaryByDate.summariesDate).locale('ru').utcOffset(0).weekday();

          daysArray[summaryWeekDay] = { dayId: summaryByDate['id'], summaryCount: summaryByDate.summaries.length };
        }
        [
          usr.monday,
          usr.tuesday,
          usr.wednesday,
          usr.thursday,
          usr.friday,
          usr.saturday,
          usr.sunday
        ] = daysArray;
        resultArray.push(usr);
      }

      return {departmentsListWithDays: resultArray, today};
    } else {
      console.log('listDepartmentsBySliceOfDate');
      throw `Can't find user`;
    }
  } catch (err) {
    console.error(err);
  }
};

exports.getDepartmentInfoById = async userId => {
  try {
    const user = await User.findOne({ _id: new ObjectId(userId)},userExcludeFields);

    if (user) {
      let active = 'не было активности';

      if(user.lastActive) {
        active = moment(user.lastActive).utcOffset(0).format('DD.MM.YYYY - HH:mm:ss');
      }

      return [
        ['Логин',user.login],
        ['Отображаемое имя', user.displayName],
        ['Описание', user.description],
        ['Последняя активность', active],
      ];
    } else {
      console.log('getDepartmentInfoById');
      throw `Can't find user`;
    }
  } catch (err) {
    console.error(err);
  }
};

exports.getListUsers = async (nullable, cb) => {
  try {
    const {
      rights,
      ...otherExcludeFields
    } = userExcludeFields;
    const users = await User.find({},otherExcludeFields);

    cb({users});
  } catch(err) {
    console.error(err);
    cb({ eventName: events.user.error, err });
  }
};