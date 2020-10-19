const DONE = "done";

export default class HtmlService {
  constructor(dobService) {
    this.dobService = dobService;
    this.bindFormEvent();
    this.listBirthDays();
  }

  bindFormEvent() {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.addBirthDay(form.fullName.value, form.dob.value);
      form.reset();
    });
  }

  async addBirthDay(fullName, dob) {
    const data = { fullName: fullName, dob: dob };
    const taskId = await this.dobService.save(data);
    data.id = taskId;
    this.addToHtmlList(data);
  }

  async listBirthDays() {
    const tasks = await this.dobService.getAll();
    tasks.forEach((task) => this.addToHtmlList(task));
  }

  async saveBirthDay(taskId, isDone) {
    const task = await this.dobService.get(taskId);
    task.done = isDone;
    this.dobService.save(task);
  }

  async deleteBirthDay(tr) {
    const taskId = +tr.getAttribute("data-item-id");
    await this.dobService.delete(taskId);
    tr.remove();
  }

  addToHtmlList(dob) {
    const tbody = document.querySelector("tbody");

    const tr = document.createElement("tr");
    tr.setAttribute("data-item-id", dob.id);

    const tdFullName = document.createElement("td");
    tdFullName.classList.add("mdl-data-table__cell--non-numeric");
    tdFullName.textContent = dob.fullName;
    tr.append(tdFullName);

    const tdDob = document.createElement("td");
    tdFullName.classList.add("mdl-data-table__cell--non-numeric");
    tdDob.innerText = dob.dob;
    tr.append(tdDob);

    const tdDelete = document.createElement("td");
    const button = document.createElement("button");
    //mdl-button mdl-js-button mdl-button--accent
    button.classList.add("mdl-button");
    button.classList.add("mdl-js-button");
    button.classList.add("mdl-button--accent");
    button.textContent = "x";
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      this.deleteBirthDay(tr);
    });
    tdDelete.appendChild(button);
    tr.appendChild(tdDelete);

    tbody.appendChild(tr);
  }
}
