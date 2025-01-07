
const studentForm = document.getElementById('student-form');
const studentNameInput = document.getElementById('student-name');
const studentAgeInput = document.getElementById('student-age');
const studentGradeInput = document.getElementById('student-grade');
const studentTableBody = document.getElementById('student-table').getElementsByTagName('tbody')[0];

let editingRow = null; 

function loadStudents() {
  
    const students = JSON.parse(localStorage.getItem('students')) || [];

  
    studentTableBody.innerHTML = '';

    
    students.forEach(student => {
        const newRow = studentTableBody.insertRow();
        newRow.insertCell(0).textContent = student.name;
        newRow.insertCell(1).textContent = student.age;
        newRow.insertCell(2).textContent = student.grade;

       
        const actionsCell = newRow.insertCell(3);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function () {
            editStudent(newRow);
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            deleteStudent(newRow);
        };

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
    });
}


function handleSubmit(event) {
    event.preventDefault(); //

    
    const name = studentNameInput.value.trim();
    const age = studentAgeInput.value.trim();
    const grade = studentGradeInput.value.trim();

   
    if (name && age && grade) {
        const students = JSON.parse(localStorage.getItem('students')) || [];

        if (editingRow) {
            
            const index = editingRow.rowIndex - 1; 
            students[index] = { name, age, grade }; 
            localStorage.setItem('students', JSON.stringify(students)); 

            editingRow.cells[0].textContent = name;
            editingRow.cells[1].textContent = age;
            editingRow.cells[2].textContent = grade;
            editingRow = null; 
            studentForm.querySelector('button').textContent = 'Add Student';
        } else {
            
            students.push({ name, age, grade });

           
            localStorage.setItem('students', JSON.stringify(students));

           
            const newRow = studentTableBody.insertRow();
            newRow.insertCell(0).textContent = name;
            newRow.insertCell(1).textContent = age;
            newRow.insertCell(2).textContent = grade;

           
            const actionsCell = newRow.insertCell(3);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.onclick = function () {
                editStudent(newRow);
            };

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function () {
                deleteStudent(newRow);
            };

            actionsCell.appendChild(editButton);
            actionsCell.appendChild(deleteButton);
        }

        
        studentNameInput.value = '';
        studentAgeInput.value = '';
        studentGradeInput.value = '';
    } else {
        alert('Please fill in all fields');
    }
}


function editStudent(row) {
   
    studentNameInput.value = row.cells[0].textContent;
    studentAgeInput.value = row.cells[1].textContent;
    studentGradeInput.value = row.cells[2].textContent;

   
    editingRow = row;

   
    studentForm.querySelector('button').textContent = 'Update Student';
}


function deleteStudent(row) {
    if (confirm('Are you sure you want to delete this student?')) {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const index = row.rowIndex - 1; // Get the index of the row being deleted
        students.splice(index, 1); // Remove the student from the array
        localStorage.setItem('students', JSON.stringify(students)); // Update localStorage
        row.remove(); 
    }
}


studentForm.addEventListener('submit', handleSubmit);


window.onload = loadStudents;
