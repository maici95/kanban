


function ajax() {

    this.get = (path, body) => ajaxcall('GET', path, body);
    this.post = (path, body) => ajaxcall('POST', path, body);
    
    this.delete = (path) => ajaxcall('DELETE', path);
    this.patch = (path, body) => ajaxcall('PATCH', path, body);

}

async function ajaxcall(method, path, body) {

    let url = 'http://localhost:3000';
    const options = {
        method: method,
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    if (path) {
        url += '/' + path;
    }

    if (method === 'POST' || method === 'PATCH') {
        options.body = JSON.stringify({
            ...body,
            updated: new Date().toISOString().slice(0, 10)
        });
    }

    if (method === 'GET' && body) {
        url += '?';
        Object.keys(body).forEach(key => {
            url += '&'+key+'='+body[key];
        });
    }

    if (method === 'PATCH') {
        url += '/' + body.id;
    }

    const data = await fetch(url, options)
        .then(res => {
            if (method === 'GET') {
                return res.json();
            }
            return res;
        })
        .then(result => {
            return result;
        });

    return data;

}

module.exports = ajax;
