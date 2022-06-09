const fs = require("fs");
const path = require("path");
const filedirname = "data";
let directory_name = "public/assests/audio";

let filenames = fs.readdirSync(directory_name);
const data = filenames.reduce((p, n) => {
    const name = n.replace(path.extname(n), "");
    const relativepath = "../assests/audio/" + n;
    const data = {
        name,
        path: relativepath,
    };
    p.push(data);
    return p;
}, []);

if (!fs.existsSync("views")) {
    fs.mkdir("src/" + filedirname, (err) => {
        if (err) return err;
        generatefile();
    });
}
generatefile();
function generatefile() {
    fs.writeFile(
        "src/" + filedirname + "/sound.json",
        JSON.stringify(data, null, 2),
        (err) => {
            if (err) throw err;
            console.log("The file has been saved!");
        }
    );
}
