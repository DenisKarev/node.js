const fs = require('node:fs');
const dbFilePath = './users.db.json';

class Db {
  #uid = 1;
  #users = [];
  readUsersFile() {
    try {
      let file = fs.readFileSync(dbFilePath);
      const fl = file.length <= 2;
      if (fl) {
        console.log('dbFile -> empty');
      } else {
        this.#users = [...JSON.parse(file)];
      }
    } catch (error) {
      console.log(`no dbFile !  ${error?.code}`);
      this.#writeUsersFile();
    }
  }

  usersRead() {
    this.readUsersFile();
    if (!this.#users?.length) {
      return null;
    } else {
      return { users: [...this.#users] };
    }
  }

  findUser(id) {
    this.readUsersFile();

    if (!this.#users?.length) {
      return null;
    } else {
      const user = this.#users.find((user) => user.id === id);
      if (user) {
        return user;
      } else {
        return null;
      }
    }
  }

  addUser(user) {
    this.readUsersFile();
    const cuid = this.#uid++;
    this.#users.push({ id: cuid, ...user });
    this.#writeUsersFile();
    return cuid;
  }

  modifyUser(id, user) {
    this.readUsersFile();
    let modUser = this.#users.find((user) => user.id === id);
    modUser.age = user.age;
    modUser.firstname = user.firstname;
    modUser.secondname = user.secondname;
    modUser.city = user.city;
    this.#writeUsersFile();
    return modUser;
  }

  deleteUser(id, user) {
    this.readUsersFile();
    const uindex = this.#users.indexOf(user);
    this.#users.splice(uindex, 1);
    this.#writeUsersFile();
    return user;
  }

  #writeUsersFile() {
    try {
      fs.writeFileSync(dbFilePath, JSON.stringify(this.#users, null, 2));
    } catch (error) {
      console.log('some shit happened on write');
      console.log(error);
    }
  }

  constructor() {
    this.readUsersFile();
    let maxId;
    try {
      maxId = Math.max(...this.#users?.map((v) => v.id));
    } catch (e) {
      console.log(e);
    }
    if (!isFinite(maxId)) {
      maxId = 0;
    }
    this.#uid = ++maxId;
    // console.log(this.#uid);
  }
}

module.exports = new Db();
