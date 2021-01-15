// src/server/config/*.json

const collections = [
  {
    name: 'entities',
    data: {
      'airports': [
        {
          'name': 'USTR',
          'value': 'Тюмень'
        },
        {
          'name': 'USTL',
          'value': 'Плеханово'
        },
        {
          'name': 'USTO',
          'value': 'Тобольск'
        },
        {
          'name': 'USTM',
          'value': 'Ишим'
        },
        {
          'name': 'USTA',
          'value': 'Уват'
        },
        {
          'name': 'ZZZZ',
          'value': 'Сузгун'
        },
        {
          'name': 'ZZZZ',
          'value': 'Тямка'
        },
        {
          'name': 'USHH',
          'value': 'З-Ханты'
        },
        {
          'name': 'USRR',
          'value': 'З-Сургут'
        },
        {
          'name': 'UNTT',
          'value': 'З-Томск'
        },
        {
          'name': 'UNOO',
          'value': 'З-Омск'
        },
        {
          'name': 'USUU',
          'value': 'З-Курган'
        },
        {
          'name': 'USSS',
          'value': 'З-Екатеринбург'
        },
        {
          'name': 'ZZZZ',
          'value': 'Геоточка'
        }
      ],
      'aircraftType ': [
        {
          'id': 'MI8',
          'value': 'МИ-8(и мод.) или МИ-17(и мод.)'
        },
        {
          'id': 'MI2',
          'value': 'Ми-2'
        },
        {
          'id': 'MI26',
          'value': 'МИ-26'
        },
        {
          'id': 'AS50',
          'value': 'AS.350 (H-125)'
        },
        {
          'id': 'AS55',
          'value': 'AS.355 (AS355 NP)'
        },
        {
          'id': 'KA27',
          'value': 'Ка-32'
        },
        {
          'id': 'R44',
          'value': 'Robinson R44'
        },
        {
          'id': 'AN2',
          'value': 'Ан-2 (\'Кукурузник\')'
        },
        {
          'id': 'ULAC',
          'value': 'Сверх лёгкое ВС'
        }
      ],
      'literals': [
        {
          'name': '',
          'value': 'СЗ'
        },
        {
          'name': '',
          'value': 'РЖ'
        },
        {
          'name': '',
          'value': 'К'
        },
        {
          'name': '',
          'value': 'ПКР'
        },
        {
          'name': '',
          'value': 'ГОС'
        }
      ],
      'directions': [
        {
          'name': 'UP',
          'icon': {
            'type': 'Font Awesome',
            'className': 'fas fa-long-arrow-alt-up'
          },
          'value': 'взлёт'
        },
        {
          'name': 'DOWN',
          'icon': {
            'type': 'Font Awesome',
            'className': 'fas fa-long-arrow-alt-down'
          },
          'value': 'посадка'
        },
        {
          'name': 'PASSING',
          'icon': {
            'type': 'Font Awesome',
            'className': 'fas fa-long-arrow-alt-right'
          },
          'value': 'проходящий'
        }
      ],
      'specialSymbols': [
        {
          'name': 1.0,
          'value': 'груз'
        },
        {
          'name': 2.0,
          'value': 'COR'
        },
        {
          'name': 3.0,
          'value': '*'
        }
      ],
      'timeLineTypes': [
        {
          'name': 1.0,
          'value': 'время',
          'icon': {
            'type': 'Font Awesome',
            'className': 'far fa-clock'
          }
        },
        {
          'name': 2.0,
          'value': 'маршрут',
          'icon': {
            'type': 'Font Awesome',
            'className': 'fas fa-route'
          }
        },
        {
          'name': 3.0,
          'value': 'направление',
          'icon': {
            'type': 'Font Awesome',
            'className': 'fas fa-map-signs'
          }
        },
        {
          'name': 4.0,
          'value': 'передача',
          'icon': {
            'type': 'Font Awesome',
            'className': 'fas fa-broadcast-tower'
          }
        },
        {
          'name': 5.0,
          'value': 'спец. символы',
          'icon': {
            'type': 'Font Awesome',
            'className': 'fas fa-code'
          }
        },
        {
          'name': 6.0,
          'value': 'конец',
          'icon': {
            'type': 'Font Awesome',
            'className': 'fas fa-hourglass-end'
          }
        }
      ],
      'zones': [
        {
          'freq': '126.1 МГц',
          'value': 'Тюмень-ДПП'
        },
        {
          'freq': '132.6 МГц',
          'value': 'Тюмень-Контроль-1'
        },
        {
          'freq': '133.6 МГц',
          'value': 'Тюмень-Контроль-2'
        },
        {
          'freq': '126.0 МГц',
          'value': 'Хантым-Информация'
        },
        {
          'freq': '134.1 МГц',
          'value': 'Сургут-Информация-ЮГ'
        },
        {
          'freq': '122.3 МГц',
          'value': 'Томск-Информация-4'
        },
        {
          'freq': '131.2 МГц',
          'value': 'Омск-ДПП'
        },
        {
          'freq': '120.3 МГц',
          'value': 'Курган-ДПП'
        },
        {
          'freq': '122.1 МГц',
          'value': 'Урал-Информация'
        },
        {
          'freq': '131.25 МГц',
          'value': 'Ишим'
        },
        {
          'freq': '118.0 МГц',
          'value': 'Уват'
        },
        {
          'freq': '118.0 МГц',
          'value': 'Ялуторовск'
        },
        {
          'freq': '120.3 МГц',
          'value': 'Тобольск-Информация'
        }
      ],
      'routes': [],
      'finishTypes': [
        {
          value: 'конец',
          'icon': {
            'type': 'Font Awesome',
            'className': 'fas fa-calendar-check'
          }
        },
        {
          value: 'уходящий',
          'icon': {
            'type': 'Font Awesome',
            'className': 'fas fa-sign-out-alt'
          }
        },
        {
          value: 'приходящий',
          'icon': {
            'type': 'Font Awesome',
            'className': 'fas fa-sign-in-alt'
          }
        }
      ],
      flyCtg: [
        {
          value: 'UTP',
          description: 'Учебно-тренировочный полёт'
        },
        {
          value: 'LP',
          description: 'Лётные проверки'
        },
        {
          value: 'KIP',
          description: 'Контрольно-испытательные полёты'
        },
        {
          value: 'MU',
          description: 'Посадка на запасной аэродром по метеоусловиям',
        }
      ],
    }
  },
  {
    name: 'users',
  }
];

const createCollection = async (db, colObj) => {
  await db.createCollection(colObj.name);
  if (colObj.data)
    await db.collection(colObj.name).insertOne(colObj.data);
};

module.exports = {
  async up(db) {
    for (let i = 0; i < collections.length; i++) {
      const element = collections[i];

      try {
        const col = await db.listCollections({ name: element.name }).toArray();

        if (col.length > 0) {
          throw new Error(`Collection ${element.name} already exists in MongoDb. Exited...`);
        } else {
          await createCollection(db, element);
        }
      } catch (err) {
        throw err;
      }
    }
  },

  async down(db) {
    for (let i = 0; i < collections.length; i++) {
      const element = collections[i];

      try {
        await db.dropCollection(element.name);
      } catch (err) {
        throw err;
      }
    }
  }
};
