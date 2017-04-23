import 'whatwg-fetch'
export default {
    FetchData(url, method, body, callback) {
        if (method == "GET") {
            let p = fetch(url).then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    callback()
                }
            })
            return p
        } else if (method == "POST") {
            let p = fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    callback()
                }
            })
            return p
        } else if (method == 'PUT') {
            let p = fetch(url, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    callback()
                }
            })
            return p
        } 
    }
}
