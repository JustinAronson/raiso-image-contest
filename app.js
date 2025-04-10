// Imgur API configuration
const IMGUR_CLIENT_ID = 'fee03233502446f'; // Replace with your Imgur Client ID
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyWQGaNkveDywKMenMGp-trlemFHeAX8VXJg8krYjXJ4Qxowg0i_bUY0zGZHxUxWdW-4g/exec'; // Replace with your Google Apps Script URL

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contestForm');
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));

    // Preview image before upload
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.innerHTML = `<img src="${e.target.result}" class="img-fluid" alt="Preview">`;
            }
            reader.readAsDataURL(file);
        }
    });

    // Upload image to Imgur
    async function uploadToImgur(file) {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('https://api.imgur.com/3/image', {
            method: 'POST',
            headers: {
                'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Image upload failed');
        }

        const result = await response.json();
        return result.data.link;
    }

    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        try {
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = 'Uploading...';

            // Upload image to Imgur first
            const imageFile = imageUpload.files[0];
            if (!imageFile) {
                throw new Error('Please select an image');
            }

            const imageUrl = await uploadToImgur(imageFile);

            // Prepare form data
            const formData = new FormData(form);
            const data = {
                timestamp: new Date().toISOString(),
                name: formData.get('name'),
                email: formData.get('email'),
                mailingList: formData.get('mailingList') ? 'Yes' : 'No',
                imageUrl: imageUrl
            };

            // Submit to Google Sheets
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'no-cors',
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Submission failed');
            }

            // Show success and reset form
            successModal.show();
            form.reset();
            imagePreview.innerHTML = '';
        } catch (error) {
            alert(`Error: ${error.message}`);
            console.error('Error:', error);
        } finally {
            // Reset button state
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = false;
            submitButton.innerHTML = 'Submit Entry';
        }
    });
});
