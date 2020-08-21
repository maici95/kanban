


function ajax() {

    this.get = (path, body) => ajaxcall('get', path, body);
    this.post = (path, body) => ajaxcall('post', path, body);
    
    this.delete = (path) => ajaxcall('delete', path);
    this.patch = (path, body) => ajaxcall('pacth', path, body);

}

async function ajaxcall(method, path, body) {

    let url = 'http://localhost:3000';
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (path) {
        url += '/' + path;
    }

    if (method === 'post') {
        options.body = JSON.stringify(body);
    }

    if (method === 'get' && body) {
        url += '?';
        Object.keys(body).forEach(key => {
            url += '&'+key+'='+body[key];
        });
    }

    const data = await fetch(url, options)
        .then(res => {
            if (method === 'get') {
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
