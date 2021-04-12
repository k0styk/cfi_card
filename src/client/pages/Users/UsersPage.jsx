import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { uiAction } from '@redux/actions';
import { UsersListView } from '@views';
import { user as userEvents } from '@client/Events';

const UsersPage = ({socket,notify,user}) => {
  const history = useHistory();

  React.useLayoutEffect(() => {
    const id = localStorage.getItem('userId');

    if(socket.emit) {
      socket.emit(userEvents.checkAuth, ({id}), ({isLogged}) => {
        if(!isLogged) {
          history.replace('/login');
        }
      });
    }
  });

  return <UsersListView />;
  // return (
  //   <form onSubmit={registerUser}>
  //     <div className='card'>
  //       <div className='cardHeader'>Регистрация</div>
  //       <div className='cardBody'>
  //         <div className={classes.marginSides}>
  //           <FormControl fullWidth>
  //             <InputLabel htmlFor="login">Логин</InputLabel>
  //             <Input
  //               fullWidth
  //               maxLength="30"
  //               id="login"
  //               value={values.login}
  //               onChange={handleChange('login')}
  //             />
  //           </FormControl>
  //         </div>
  //         <div className={classes.marginSides}>
  //           <FormControl fullWidth>
  //             <InputLabel htmlFor="password">Пароль</InputLabel>
  //             <Input
  //               fullWidth
  //               maxLength="30"
  //               id="password"
  //               type={values.showPassword ? 'text' : 'password'}
  //               value={values.password}
  //               onChange={handleChange('password')}
  //               endAdornment={
  //                 <InputAdornment position="end">
  //                   <IconButton
  //                     aria-label="toggle password visibility"
  //                     onClick={handleClickShowPassword}
  //                     onMouseDown={handleMouseDownPassword}
  //                   >
  //                     {values.showPassword ? <Visibility /> : <VisibilityOff />}
  //                   </IconButton>
  //                 </InputAdornment>
  //               }
  //             />
  //           </FormControl>
  //         </div>
  //         <div className={classes.marginSides}>
  //           <FormControl fullWidth>
  //             <InputLabel htmlFor="displayName">Отображаемое имя</InputLabel>
  //             <Input
  //               fullWidth
  //               maxLength="30"
  //               id="displayName"
  //               value={values.displayName}
  //               onChange={handleChange('displayName')}
  //             />
  //           </FormControl>
  //         </div>
  //         <div className={classes.marginSides}>
  //           <FormControl fullWidth>
  //             <InputLabel htmlFor="description">Описание</InputLabel>
  //             <Input
  //               fullWidth
  //               maxLength="30"
  //               id="description"
  //               value={values.description}
  //               onChange={handleChange('description')}
  //             />
  //           </FormControl>
  //         </div>
  //         <div className={classes.marginSides}>
  //           <FormControl fullWidth>
  //             <InputLabel htmlFor="department">Подразделение</InputLabel>
  //             <Input
  //               fullWidth
  //               maxLength="30"
  //               id="department"
  //               value={values.department}
  //               onChange={handleChange('department')}
  //             />
  //           </FormControl>
  //         </div>
  //         {user.rights === 'admin' || user.rights === 'manager' ? <div className={classes.marginSides}>
  //           <FormControl fullWidth>
  //             <TextField
  //               fullWidth
  //               id="rights"
  //               label="Роль"
  //               value={values.rights?values.rights:''}
  //               onChange={handleChange('rights')}
  //               select
  //             >
  //               {['user', 'manager', user.rights === 'admin'?'admin':''].map((v, i) =>
  //                 v?<MenuItem disabled={(v === 'G' && !!z2l)} key={v} value={v}>{v}</MenuItem>:null)
  //               }
  //             </TextField>
  //           </FormControl>
  //         </div> : null}
  //         <div className="button-block">
  //           <Button
  //             className={classes.button}
  //             color="primary"
  //             variant="contained"
  //             type="submit"
  //           >
  //             Зарегистрировать
  //           </Button>
  //         </div>
  //       </div>
  //     </div>
  //   </form>
  // );
};

export default connect(
  ({socket, user}) => ({
    socket,
    user
  }),
  dispatch => ({
    notify:     (...args)   => dispatch(uiAction.notify.enqueueSnackbar(...args)),
  })
)(UsersPage);