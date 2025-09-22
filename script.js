/**
 * Project Kelas 12 - Sistem Manajemen Siswa
 * JavaScript untuk mengimplementasikan konsep-konsep pemrograman dasar
 */

// Data structure untuk menyimpan daftar siswa
let students = [];
let editingId = null;

// Constants
const STORAGE_KEY = 'studentData';

// DOM Elements
const studentForm = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');
const searchInput = document.getElementById('searchInput');
const totalStudentsSpan = document.getElementById('totalStudents');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');

// Class untuk merepresentasikan data siswa
class Student {
    constructor(name, className, nisn, email, phone) {
        this.id = this.generateId();
        this.name = name;
        this.className = className;
        this.nisn = nisn;
        this.email = email;
        this.phone = phone;
        this.createdAt = new Date().toISOString();
    }
    
    // Method untuk generate ID unik
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    // Method untuk validasi data
    validate() {
        const errors = [];
        
        if (!this.name || this.name.trim().length < 2) {
            errors.push('Nama harus minimal 2 karakter');
        }
        
        if (!this.className) {
            errors.push('Kelas harus dipilih');
        }
        
        if (!this.nisn || !/^\d{10}$/.test(this.nisn)) {
            errors.push('NISN harus berupa 10 digit angka');
        }
        
        if (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
            errors.push('Format email tidak valid');
        }
        
        if (!this.phone || this.phone.trim().length < 10) {
            errors.push('Nomor telepon harus minimal 10 karakter');
        }
        
        return errors;
    }
}

// Fungsi untuk mengelola Local Storage
const Storage = {
    save: function(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },
    
    load: function() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return [];
        }
    },
    
    clear: function() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }
};

// Fungsi untuk mencari siswa berdasarkan kriteria
function searchStudents(query) {
    if (!query.trim()) {
        return students;
    }
    
    const searchTerm = query.toLowerCase();
    return students.filter(student => 
        student.name.toLowerCase().includes(searchTerm) ||
        student.className.toLowerCase().includes(searchTerm) ||
        student.nisn.includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm)
    );
}

// Fungsi untuk menambah siswa baru
function addStudent(studentData) {
    const newStudent = new Student(
        studentData.name,
        studentData.className,
        studentData.nisn,
        studentData.email,
        studentData.phone
    );
    
    const errors = newStudent.validate();
    if (errors.length > 0) {
        alert('Error:\n' + errors.join('\n'));
        return false;
    }
    
    // Cek duplikasi NISN
    if (students.some(student => student.nisn === newStudent.nisn)) {
        alert('NISN sudah ada! Silakan gunakan NISN yang berbeda.');
        return false;
    }
    
    students.push(newStudent);
    Storage.save(students);
    return true;
}

// Fungsi untuk mengupdate data siswa
function updateStudent(id, studentData) {
    const index = students.findIndex(student => student.id === id);
    if (index === -1) {
        alert('Data siswa tidak ditemukan!');
        return false;
    }
    
    const updatedStudent = new Student(
        studentData.name,
        studentData.className,
        studentData.nisn,
        studentData.email,
        studentData.phone
    );
    
    updatedStudent.id = id; // Pertahankan ID asli
    updatedStudent.createdAt = students[index].createdAt; // Pertahankan tanggal pembuatan
    
    const errors = updatedStudent.validate();
    if (errors.length > 0) {
        alert('Error:\n' + errors.join('\n'));
        return false;
    }
    
    // Cek duplikasi NISN (kecuali untuk siswa yang sedang diedit)
    if (students.some(student => student.nisn === updatedStudent.nisn && student.id !== id)) {
        alert('NISN sudah ada! Silakan gunakan NISN yang berbeda.');
        return false;
    }
    
    students[index] = updatedStudent;
    Storage.save(students);
    return true;
}

// Fungsi untuk menghapus siswa
function deleteStudent(id) {
    const studentIndex = students.findIndex(student => student.id === id);
    if (studentIndex === -1) {
        alert('Data siswa tidak ditemukan!');
        return false;
    }
    
    const student = students[studentIndex];
    if (confirm(`Apakah Anda yakin ingin menghapus data siswa "${student.name}"?`)) {
        students.splice(studentIndex, 1);
        Storage.save(students);
        return true;
    }
    return false;
}

// Fungsi untuk menampilkan daftar siswa
function displayStudents(studentList = students) {
    const container = document.getElementById('studentList');
    
    if (studentList.length === 0) {
        container.innerHTML = '<p class="no-data">Tidak ada data siswa yang ditemukan.</p>';
        return;
    }
    
    container.innerHTML = studentList.map(student => `
        <div class="student-card">
            <h3>${escapeHtml(student.name)}</h3>
            <p><strong>Kelas:</strong> ${escapeHtml(student.className)}</p>
            <p><strong>NISN:</strong> ${escapeHtml(student.nisn)}</p>
            <p><strong>Email:</strong> ${escapeHtml(student.email)}</p>
            <p><strong>Telepon:</strong> ${escapeHtml(student.phone)}</p>
            <p><strong>Ditambahkan:</strong> ${formatDate(student.createdAt)}</p>
            <div class="actions">
                <button class="edit-btn" onclick="editStudent('${student.id}')">Edit</button>
                <button class="delete-btn" onclick="deleteStudentHandler('${student.id}')">Hapus</button>
            </div>
        </div>
    `).join('');
}

// Fungsi untuk menghindari XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Fungsi untuk format tanggal
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Fungsi untuk mengupdate statistik
function updateStats() {
    totalStudentsSpan.textContent = `Total Siswa: ${students.length}`;
}

// Fungsi untuk reset form
function resetForm() {
    studentForm.reset();
    editingId = null;
    submitBtn.textContent = 'Tambah Siswa';
    cancelBtn.style.display = 'none';
}

// Fungsi untuk edit siswa
function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (!student) {
        alert('Data siswa tidak ditemukan!');
        return;
    }
    
    // Isi form dengan data siswa
    document.getElementById('name').value = student.name;
    document.getElementById('class').value = student.className;
    document.getElementById('nisn').value = student.nisn;
    document.getElementById('email').value = student.email;
    document.getElementById('phone').value = student.phone;
    
    editingId = id;
    submitBtn.textContent = 'Update Siswa';
    cancelBtn.style.display = 'inline-block';
    
    // Scroll ke form
    document.querySelector('.input-section').scrollIntoView({ behavior: 'smooth' });
}

// Handler untuk menghapus siswa
function deleteStudentHandler(id) {
    if (deleteStudent(id)) {
        displayStudents();
        updateStats();
    }
}

// Fungsi untuk export data
function exportData() {
    if (students.length === 0) {
        alert('Tidak ada data untuk di-export!');
        return;
    }
    
    const dataStr = JSON.stringify(students, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `data-siswa-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// Fungsi untuk menghapus semua data
function clearAllData() {
    if (students.length === 0) {
        alert('Tidak ada data untuk dihapus!');
        return;
    }
    
    if (confirm('Apakah Anda yakin ingin menghapus SEMUA data siswa? Tindakan ini tidak dapat dibatalkan!')) {
        students = [];
        Storage.clear();
        displayStudents();
        updateStats();
        resetForm();
        alert('Semua data telah dihapus!');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load data dari localStorage
    students = Storage.load();
    displayStudents();
    updateStats();
    
    // Form submission
    studentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(studentForm);
        const studentData = {
            name: formData.get('name').trim(),
            className: formData.get('class'),
            nisn: formData.get('nisn').trim(),
            email: formData.get('email').trim(),
            phone: formData.get('phone').trim()
        };
        
        let success = false;
        if (editingId) {
            success = updateStudent(editingId, studentData);
        } else {
            success = addStudent(studentData);
        }
        
        if (success) {
            displayStudents();
            updateStats();
            resetForm();
            alert(editingId ? 'Data siswa berhasil diupdate!' : 'Data siswa berhasil ditambahkan!');
        }
    });
    
    // Cancel edit
    cancelBtn.addEventListener('click', resetForm);
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchResults = searchStudents(this.value);
        displayStudents(searchResults);
    });
    
    // Clear search
    document.getElementById('clearSearch').addEventListener('click', function() {
        searchInput.value = '';
        displayStudents();
    });
    
    // Export data
    document.getElementById('exportBtn').addEventListener('click', exportData);
    
    // Clear all data
    document.getElementById('clearAllBtn').addEventListener('click', clearAllData);
});

// Validasi input real-time
document.getElementById('nisn').addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
});

document.getElementById('phone').addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9+\-\s]/g, '');
});

// Demo data untuk testing (uncomment untuk menambah data sample)
/*
function addSampleData() {
    const sampleStudents = [
        { name: 'Ahmad Fauzi', className: '12 IPA 1', nisn: '1234567890', email: 'ahmad@email.com', phone: '081234567890' },
        { name: 'Siti Nurhaliza', className: '12 IPA 2', nisn: '1234567891', email: 'siti@email.com', phone: '081234567891' },
        { name: 'Budi Santoso', className: '12 IPS 1', nisn: '1234567892', email: 'budi@email.com', phone: '081234567892' }
    ];
    
    sampleStudents.forEach(data => addStudent(data));
    displayStudents();
    updateStats();
}
*/