document.addEventListener('DOMContentLoaded', function () {
      const signInForm = document.getElementById('signInForm');
      const signInList = document.getElementById('signInList');
      const clearListButton = document.getElementById('clearListButton');

      // Load existing data from localStorage
      loadSignInData();

      signInForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const rank = document.getElementById('rank').value;
        const gender = document.getElementById('gender').value;

        addSignInRecord(name, rank, gender);

        // Save data to localStorage
        saveSignInData();

        // Clear the form fields after submission
        signInForm.reset();
      });

      clearListButton.addEventListener('click', function () {
        clearSignInData();
        signInList.innerHTML = ''; // Clear the list on the page
      });

      function addSignInRecord(name, rank, gender) {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const rankCell = document.createElement('td');
        const genderCell = document.createElement('td');

        nameCell.textContent = name;
        rankCell.textContent = rank;
        genderCell.textContent = gender;

        row.appendChild(nameCell);
        row.appendChild(rankCell);
        row.appendChild(genderCell);

        signInList.appendChild(row);
      }

      function saveSignInData() {
        const rows = signInList.querySelectorAll('tr');
        const data = Array.from(rows).map((row) => {
          const cells = row.querySelectorAll('td');
          return {
            name: cells[0].textContent,
            rank: cells[1].textContent,
            gender: cells[2].textContent,
          };
        });
        localStorage.setItem('signInData', JSON.stringify(data));
      }

      function loadSignInData() {
        const data = JSON.parse(localStorage.getItem('signInData'));
        if (data) {
          data.forEach((item) => {
            addSignInRecord(item.name, item.rank, item.gender);
          });
        }
      }

      function clearSignInData() {
        localStorage.removeItem('signInData');
      }
    });
