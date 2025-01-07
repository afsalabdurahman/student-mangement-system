interface Student {
  name: string;
  age: string;
  grade: string;
}

const studentForm = document.getElementById("student-form") as HTMLFormElement;
const studentNameInput = document.getElementById(
  "student-name"
) as HTMLInputElement;
const studentAgeInput = document.getElementById(
  "student-age"
) as HTMLInputElement;
const studentGradeInput = document.getElementById(
  "student-grade"
) as HTMLInputElement;
const studentTableBody = (
  document.getElementById("student-table") as HTMLTableElement
).getElementsByTagName("tbody")[0];

let editingRow: HTMLTableRowElement | null = null;

function loadStudents(): void {
  const students: Student[] = JSON.parse(
    localStorage.getItem("students") || "[]"
  );

  studentTableBody.innerHTML = "";

  students.forEach((student: Student) => {
    const newRow = studentTableBody.insertRow();
    newRow.insertCell(0).textContent = student.name;
    newRow.insertCell(1).textContent = student.age;
    newRow.insertCell(2).textContent = student.grade;

    const actionsCell = newRow.insertCell(3);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = function () {
      editStudent(newRow);
    };

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      deleteStudent(newRow);
    };

    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
  });
}

function handleSubmit(event: Event): void {
  event.preventDefault();

  const name = studentNameInput.value.trim();
  const age = studentAgeInput.value.trim();
  const grade = studentGradeInput.value.trim();

  if (name && age && grade) {
    const students: Student[] = JSON.parse(
      localStorage.getItem("students") || "[]"
    );

    if (editingRow) {
      const index = editingRow.rowIndex - 1;
      students[index] = { name, age, grade };
      localStorage.setItem("students", JSON.stringify(students));

      editingRow.cells[0].textContent = name;
      editingRow.cells[1].textContent = age;
      editingRow.cells[2].textContent = grade;
      editingRow = null;
      studentForm.querySelector("button")!.textContent = "Add Student";
    } else {
      students.push({ name, age, grade });

      localStorage.setItem("students", JSON.stringify(students));

      const newRow = studentTableBody.insertRow();
      newRow.insertCell(0).textContent = name;
      newRow.insertCell(1).textContent = age;
      newRow.insertCell(2).textContent = grade;

      const actionsCell = newRow.insertCell(3);

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.onclick = function () {
        editStudent(newRow);
      };

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = function () {
        deleteStudent(newRow);
      };

      actionsCell.appendChild(editButton);
      actionsCell.appendChild(deleteButton);
    }

    studentNameInput.value = "";
    studentAgeInput.value = "";
    studentGradeInput.value = "";
  } else {
    alert("Please fill in all fields");
  }
}

function editStudent(row: HTMLTableRowElement): void {
  studentNameInput.value = row.cells[0].textContent || "";
  studentAgeInput.value = row.cells[1].textContent || "";
  studentGradeInput.value = row.cells[2].textContent || "";

  editingRow = row;

  studentForm.querySelector("button")!.textContent = "Update Student";
}

function deleteStudent(row: HTMLTableRowElement): void {
  if (confirm("Are you sure you want to delete this student?")) {
    const students: Student[] = JSON.parse(
      localStorage.getItem("students") || "[]"
    );
    const index = row.rowIndex - 1;
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    row.remove();
  }
}

studentForm.addEventListener("submit", handleSubmit);

window.onload = loadStudents;
