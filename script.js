// Array ya kuhifadhi wanafunzi
let students = [];

// Get form
const form = document.getElementById("studentForm");

// Event Listener
form.addEventListener("submit", registerStudent);

// Register Student Function
function registerStudent(e) {
    e.preventDefault();

    const id = document.getElementById("studentId").value.trim();
    const name = document.getElementById("fullName").value.trim();
    const age = parseInt(document.getElementById("age").value);
    const gender = document.getElementById("gender").value;
    const formLevel = parseInt(document.getElementById("form").value);

    // Validation
    if (!id || !name || !age || !gender || !formLevel) {
        alert("Please fill all fields correctly!");
        return;
    }

    // Check unique ID
    const existingStudent = students.find(student => student.id === id);
    if (existingStudent) {
        alert("Student ID already exists!");
        return;
    }

    // Create student object
    const newStudent = {
        id: id,
        name: name,
        age: age,
        gender: gender,
        form: formLevel,
        performance: []
    };

    // Save to array
    students.push(newStudent);

    // Refresh table
    displayStudents();

    // Reset form
    form.reset();
}

// Display Students
function displayStudents() {
    const tableBody = document.getElementById("studentTableBody");
    tableBody.innerHTML = "";

    students.forEach(student => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>Form ${student.form}</td>
            <td>${calculateAverage(student)}</td>
            <td>
                <button onclick="openPerformance('${student.id}')">Add Marks</button>
                <button onclick="promoteStudent('${student.id}')">Promote</button>
                <button onclick="deleteStudent('${student.id}')">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Delete Student
function deleteStudent(id) {
    students = students.filter(student => student.id !== id);
    displayStudents();
}

// Calculate Average Score
function calculateAverage(student) {
    if (student.performance.length === 0) {
        return 0;
    }

    let total = 0;
    let count = 0;

    student.performance.forEach(record => {
        total += record.subjects.math;
        total += record.subjects.english;
        total += record.subjects.science;
        total += record.subjects.social;
        count += 4;
    });

    return (total / count).toFixed(2);
}
function openPerformance(id) {
    document.getElementById("performanceSection").style.display = "block";
    document.getElementById("selectedStudentId").value = id;
}

function savePerformance() {

    const id = document.getElementById("selectedStudentId").value;
    const formLevel = parseInt(document.getElementById("performanceForm").value);
    const math = parseInt(document.getElementById("math").value);
    const english = parseInt(document.getElementById("english").value);
    const science = parseInt(document.getElementById("science").value);
    const social = parseInt(document.getElementById("social").value);

    if (!formLevel || !math || !english || !science || !social) {
        alert("Fill all performance fields!");
        return;
    }

    const student = students.find(s => s.id === id);

    const performanceRecord = {
        form: formLevel,
        subjects: {
            math,
            english,
            science,
            social
        }
    };

    student.performance.push(performanceRecord);

    alert("Performance saved!");

    document.getElementById("performanceSection").style.display = "none";

    displayStudents();
}
function promoteStudent(id) {

    const student = students.find(s => s.id === id);

    const average = calculateAverage(student);

    if (average < 50) {
        alert("Student cannot be promoted. Average below 50!");
        return;
    }

    if (student.form === 4) {
        alert("Student has completed O-Level!");
        return;
    }

    student.form += 1;

    alert("Student promoted successfully!");

    displayStudents();
}