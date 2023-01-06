import '../../assets/style/upload/upload.css'
import Papa from "papaparse";
import waitForElm from '../../middlewares/waitForElm';
import { uploadCtrl } from '../../controller/upload.controller';

const Upload = () => {
    return(
        <div id="upload">
            <div className="upload-container">
            <div className="card">
                <div className="drop_box">
                <header>
                    <h4>TẢI TỆP LÊN</h4>
                </header>
                <p>Tệp hỗ trợ: CSV</p>
                <input type="file" hidden accept=".csv" id="fileID" className='input-upload'
                    onChange={(e) => {
                        const files = e.target.files;
                        if(files) {
                            Papa.parse(files[0], {
                                skipEmptyLines: true,
                                header: true,
                                complete: function(results) {
                                    waitForElm('.btn').then(() => {
                                        document.getElementsByClassName('btn')[0].addEventListener('click', () => {
                                            document.getElementsByClassName('btn')[0].innerHTML = `
                                            <div class="loader-upload"></div>`
                                            uploadCtrl(results.data)
                                        })
                                    })
                                    console.log("Finished: ", results.data)
                                }
                            })
                        }
                    }}>

                </input>
                <button className="btn">Chọn file</button>
                </div>

            </div>
            </div>           
        </div>
    )
}

waitForElm('#upload').then(() => {
    const dropArea = document.querySelector(".drop_box"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input");

  
  button.onclick = () => {
    input.click();
  };
  
  input.addEventListener("change", function (e) {
    var fileName = e.target.files[0].name;
    let filedata = `
      <div className="form">
      <h4>${fileName}</h4>
      <button class="btn">Tải lên</button>
      </div>`;
    dropArea.innerHTML = filedata;
  });
})



export default Upload

