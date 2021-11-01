function send(url, method = "GET", data = {}, headers = {}, timeout = 60000) {
    return new Promise((res, rej) => {
        var xhr;

        if (window.XMLHttpRequest) {
            // Chrome, Mozilla, Opera, Safari
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            // IE
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        };
        
        Object.entries(headers).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value);
        });
        
        xhr.timeout = timeout;
        
        xhr.ontimeout = function () {
            // Этот код выполняется, если превышено время ожидания
            rej();
        };
        
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
            // Этот код выполняется после получения ответа
                if (xhr.status < 400) {
                    rej(xhr.responseText);
                } else if (xhr.status >= 400) {
                    res(xhr.responseText);
                };
            };
        };
    
        xhr.open(method, url, true);
        
        xhr.send(method, JSON.stringify(data));
    })
};



send("http://myserver.com")
.then((data) => {

})
.catch((error) => {

})



fetch("http://myserver.com", {
    method: "POST",
    headers: {
        "Content-Type": "application/JSON"
    },
    body: JSON.stringify(data)
})
.then((res) => {
    return res.json();
})
.then((data) => {

})
.catch()

// ад колбеков через Промисы
new Promise((resolve, reject) => {
    send(reject, resolve);
})
.then((data) => {
    return new Promise((res, rej) => {
        send(rej, res);
    });
})
.then((data) => {
    return new Promise((res, rej) => {
        send(rej, res);
    });
})
.catch((error) => {

});