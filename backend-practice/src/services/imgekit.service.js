import ImageKit from '@imagekit/nodejs';
import { toFile } from '@imagekit/nodejs';


const client = new ImageKit({
    // Replace 'YOUR_PRIVATE_KEY_HERE' with your actual private key from the dashboard
    privateKey: process.env.imagekit_privatekey || 'your_actual_private_key_string',
    publicKey: 'public_+6KMmEdk7GaPjosD+4POVrsVZR4=',
    urlEndpoint: 'https://ik.imagekit.io/atdcxkqpv'
});
async function uplodeFIle({ buffer, filename, folder }) {
    const file = await client.files.upload({
        file: await toFile(Buffer.from(buffer), 'file'),
        fileName: filename,
        folder
    });

    return file;
}

export { uplodeFIle };
