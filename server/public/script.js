const loader = document.querySelector('#spinner');

const predict_form = document.querySelector('form')

predict_form.addEventListener('submit', async (event) => {
    event.preventDefault()
    // show spinner:
    loader.style.display = "inline-block"

    let formdata = new FormData(predict_form);

    // console.log([...(formdata.entries())])

    try {
        // fetch prediction:
        const res = await fetch('/predict', {
            method: 'post',
            body: formdata
        })

        const content = await res.json()
        // console.log(content)
        let str = `<tr>
        <td>${content.location}</td>
        <td>${content.area}</td>
        <td>${content.bathroom}</td>
        <td>${content.bhk}</td>
        <td>&#x20B9; ${Math.round(content.price * 100000)}</td>
    </tr>`
        // if there is no any previous prediction result then insert a new table:
        if (document.querySelector('#results').firstElementChild.nodeName == 'H1') {
            const table_body = `
            <table>
                <tr>
                    <th>Location</th>
                    <th>Area ( Sqare Feet )</th>
                    <th>Bathrooms</th>
                    <th>BHK</th>
                    <th>Price</th>
                </tr>
            </table>
        `
            var row = document.querySelector('#results').innerHTML = table_body
        }
        var row = document.querySelector('table').insertRow()
        row.innerHTML = str;


        // alert the prediction:
        window.alert(`Predicted Price: ₹ ${Math.round(content.price * 100000)}`)
        loader.style.display = "none"
    } catch (err) {
        window.alert("Something went wrong")
        console.log(err)

    }

})




// fetch all the locations on loading:
const fetchLocations = async () => {
    try {
        const res = await fetch('/locations.json');
        // console.log(res)
        const content = await res.json()

        let str;
        for (const key in content) {
            if (Object.hasOwnProperty.call(content, key)) {
                const location = content[key];
                // console.log(location)
                let temp = `<option value="${location}"></option>`
                str += temp;

            }
        }
        // console.log(str)
        document.querySelector('#locations').innerHTML = str;



    } catch (err) {
        console.log(err)
    }
}

fetchLocations()


