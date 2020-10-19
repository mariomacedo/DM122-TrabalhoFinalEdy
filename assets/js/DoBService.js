import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.2/dist/dexie.mjs";

let db;

export default class DoBService {
  constructor() {
    this.initializeDB();
  }

  initializeDB() {
    db = new Dexie("dobDB");

    db.version(1).stores({
      dobs: "++id,fullName",
    });

    db.on("populate", async () => {
      console.log("It runs only once!");
      await db.dobs.bulkPut([
        { fullName: "Mário Guilherme Macedo", dob: "11/03/1991" },
        { fullName: "Isabela Zaboti Brumer", dob: "27/02/1995" },
        { fullName: "Renato Hilário Faria", dob: "30/10/1989" },
        { fullName: "Vitória Rasmussen", dob: "01/04/1994" },
      ]);
    });
  }

  getAll() {
    return db.dobs.toArray();
  }

  get(id) {
    return db.dobs.get(id);
  }

  save(task) {
    return db.dobs.put(task);
  }

  delete(id) {
    return db.dobs.delete(id);
  }
}
