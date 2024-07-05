const uploadFile = async () => {
    const fileInput = document.getElementById('fileInput');
    const status = document.getElementById('status');

    if (fileInput.files.length === 0) {
        status.textContent = "Please select a file.";
        return;
    }

    const file = fileInput.files[0];
    const config = await fetch('config.json').then(response => response.json());

    const formData = new FormData();
    formData.append('file', file);

    console.log(config.scheme + "://" + config.host + (":" + config.port) ?? "" + config.endpoint);

    try {
        const response = await fetch(config.scheme + "://" + config.host + (":" + conifg.port) ?? "" + config.endpoint, {
            method: config.method,
            body: formData
        });

        if (response.ok) {
            status.textContent = "File uploaded successfully!";
        } else {
            status.textContent = `Failed to upload file: ${response.statusText}`;
        }
    } catch (error) {
        status.textContent = `Error: ${error.message}`;
    }
}
