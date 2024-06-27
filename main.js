document.addEventListener('DOMContentLoaded', (event) => {
    // Get the modal
    var modal = document.getElementById('nameModal');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName('close')[0];

    // Show the modal
    modal.style.display = 'flex';

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = 'none';
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
});

window.updateName = function() {
    const nameInput = document.getElementById('name').value;
    const roll = document.getElementById("rollno").value;
    const branch = document.getElementById("branch").value;
    const emailInput = document.getElementById('email').value;
    const profileName = document.getElementById('profile-name');
    const pr = document.getElementById('roll');
    const pb = document.getElementById('bh');
    
    if (nameInput && emailInput) {
        profileName.textContent = nameInput;
        pr.textContent = roll;
        pb.textContent = branch;
        modal.style.display = 'none';

        // Store the email in a hidden input for later use
        let existingHiddenInput = document.getElementById('userEmail');
        if (!existingHiddenInput) {
            existingHiddenInput = document.createElement('input');
            existingHiddenInput.type = 'hidden';
            existingHiddenInput.id = 'userEmail';
            document.body.appendChild(existingHiddenInput);
        }
        existingHiddenInput.value = emailInput;
    } else {
        alert("Please enter your name and email");
    }
};

export function submitForm() {
    const name = document.getElementById('profile-name').textContent;
    const emailInputElement = document.getElementById('email');
    const email = emailInputElement ? emailInputElement.value : '';

    if (!email) {
        console.error("Email input not found");
        return;
    }

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
