// Function to add a new dynamic block
function addBlock() {
    const blockTemplate = document.createElement('div');
    blockTemplate.classList.add('dynamic-block');
    blockTemplate.innerHTML = `
        <label for="block-title">Title:</label>
        <input type="text" class="block-title" name="block-title" placeholder="Enter section title">
        <textarea class="block-content" name="block-content" rows="4" placeholder="Enter section content"></textarea>
        <button type="button" class="remove-block">Remove</button>
    `;

    // Add event listener for removing the block
    blockTemplate.querySelector('.remove-block').addEventListener('click', removeBlock);

    // Add event listeners for input changes to update preview
    const titleInput = blockTemplate.querySelector('.block-title');
    const contentInput = blockTemplate.querySelector('.block-content');
    titleInput.addEventListener('input', updatePreview);
    contentInput.addEventListener('input', updatePreview);

    // Append the new block to the dynamic container
    document.querySelector('.dynamic-container').appendChild(blockTemplate);
}

// Function to remove a dynamic block
function removeBlock(event) {
    event.target.parentElement.remove(); // Remove the block
    updatePreview(); // Update the live preview
}


// Function to update the live preview
function updatePreview() {
    // Update static fields in the preview
    document.getElementById('preview-name').textContent = document.getElementById('name').value;
    document.getElementById('preview-email').textContent = document.getElementById('email').value;
    document.getElementById('preview-phone').textContent = document.getElementById('phone').value;
    document.getElementById('preview-skills').textContent = document.getElementById('skills').value;
    document.getElementById('preview-experience').textContent = document.getElementById('experience').value;
    document.getElementById('preview-education').textContent = document.getElementById('education').value;

    // Update dynamic blocks in the preview
    const previewArea = document.querySelector('.resume-preview');
    previewArea.querySelectorAll('.dynamic-preview').forEach(el => el.remove()); // Clear old dynamic previews

    document.querySelectorAll('.dynamic-block').forEach(block => {
        const title = block.querySelector('.block-title').value;
        const content = block.querySelector('.block-content').value;

        if (title && content) {
            const dynamicPreview = document.createElement('div');
            dynamicPreview.classList.add('dynamic-preview');
            dynamicPreview.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
            previewArea.appendChild(dynamicPreview);
        }
    });
}



// Function to generate PDF
async function generatePDF() {
    const { jsPDF } = window.jspdf;

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;
    const education = document.getElementById('education').value;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Resume', 105, 20, null, null, 'center');

    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 20, 40);
    doc.text(`Email: ${email}`, 20, 50);
    doc.text(`Phone: ${phone}`, 20, 60);

    doc.setFontSize(14);
    doc.text('Skills:', 20, 80);
    doc.setFontSize(12);
    doc.text(skills, 20, 90);

    doc.setFontSize(14);
    doc.text('Work Experience:', 20, 110);
    doc.setFontSize(12);
    doc.text(experience, 20, 120, { maxWidth: 170 });

    doc.setFontSize(14);
    doc.text('Education:', 20, 150);
    doc.setFontSize(12);
    doc.text(education, 20, 160);

    // Add dynamic sections
    let y = 180; // Vertical position for dynamic sections
    document.querySelectorAll('.dynamic-block').forEach(block => {
        const title = block.querySelector('.block-title').value;
        const content = block.querySelector('.block-content').value;

        if (title && content) {
            doc.setFontSize(14);
            doc.text(title, 20, y);
            y += 10;
            doc.setFontSize(12);
            doc.text(content, 20, y, { maxWidth: 170 });
            y += 20;
        }
    });

    doc.save(`${name}_Resume.pdf`);
}

// Event listeners
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', updatePreview);
});
document.querySelector('.add-block').addEventListener('click', addBlock);
