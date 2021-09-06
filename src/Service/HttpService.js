import jwtDecode from 'jwt-decode';



const ROOT_URL = 'https://jogtracker.herokuapp.com/api/v1'


export class HttpService {

    constructor() {
        this.access_token = localStorage.getItem('token');
        this.get = this.get.bind(this);
        this.post = this.post.bind(this);
        this.postPure = this.postPure.bind(this);
        this.toFormData = this.toFormData.bind(this);
        this.isAuthTokenValid = this.isAuthTokenValid.bind(this)
        this.setToken = this.setToken.bind(this)
    }


    /*****
     * GET request with
     * AUTHORIZATION headers ( bearer )
     * @param httpUrl
     * @param data
     * @param successCb
     * @param errorCb
     * @param options
     */
    get(httpUrl, data, successCb, errorCb, options = null) {
        let formBody = this.createFormBody(data);
        let status = null;
        return fetch(ROOT_URL + httpUrl + '?' + formBody, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.access_token,
            }
        })
            .then((response) => {
                status = response.status;
                return response;
            })
            .then((response) => response.json())
            .then((response) => {
                if (status >= 200 && status < 300) {
                    return response;
                }
                throw response;
            })
            .then((response) => {
                if (successCb) {
                    return successCb(response);
                } else {
                    return Promise.resolve(response);
                }
            })
            .catch((error) => {
                if (errorCb) {

                    return errorCb(error);
                } else {
                    return Promise.reject(error);
                }
            });
    }

    /*****
     * POST request with
     * AUTHORIZATION headers ( bearer )
     * @param httpUrl
     * @param data
     * @param successCb
     * @param errorCb
     */
    post(httpUrl, data, successCb, errorCb) {
        let formBody = this.createFormBody(data);
        let status = null;
        return fetch(ROOT_URL + httpUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.access_token,
            },
            body: formBody,
        })
            .then((response) => {
                status = response.status;
                return response;
            })
            .then((response) => response.json())
            .then((response) => {
                if (status >= 200 && status < 300) {
                    return response;
                }
                throw response;
            })
            .then((response) => {
                if (successCb) {
                    return successCb(response);
                } else {
                    return Promise.resolve(response);
                }
            })
            .catch((error) => {
                if (errorCb) {
                    return errorCb(error);
                } else {
                    return Promise.reject(error);
                }
            });
    }

    /*****
     * PUT request with
     * AUTHORIZATION headers ( bearer )
     * @param httpUrl
     * @param data
     * @param successCb
     * @param errorCb
     */
     put(httpUrl, data, successCb, errorCb) {
        let formBody = this.createFormBody(data);
        let status = null;
        return fetch(ROOT_URL + httpUrl, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + this.access_token,
            },
            body: formBody,
        })
            .then((response) => {
                status = response.status;
                return response;
            })
            .then((response) => response.json())
            .then((response) => {
                if (status >= 200 && status < 300) {
                    return response;
                }
                throw response;
            })
            .then((response) => {
                if (successCb) {
                    return successCb(response);
                } else {
                    return Promise.resolve(response);
                }
            })
            .catch((error) => {
                if (errorCb) {
                    return errorCb(error);
                } else {
                    return Promise.reject(error);
                }
            });
    }


    /*****
     * POST pure
     * @param httpUrl
     * @param data
     * @param successCb
     * @param errorCb
     */
     postPure(httpUrl, data, successCb, errorCb) {
        let formBody = this.createFormBody(data);
        let status = null;
        console.log('---------------');
        console.log('---------------');
        console.log(ROOT_URL);
        return fetch(ROOT_URL + httpUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody
        })
            .then((response) => {
                status = response.status;
                return response;
            })
            .then((response) => response.json())
            .then((response) => {
                if (status >= 200 && status < 300) {
                    return response;
                }
                throw response;
            })
            .then((response) => {
                if (successCb) {
                    return successCb(response);
                } else {
                    return Promise.resolve(response);
                }
            })
            .catch((error) => {
                if (errorCb) {
                    return errorCb(error);
                } else {
                    return Promise.reject(error);
                }
            });
    }


    toFormData(data) {
        let fd = new FormData();
        for (let property in data) {
            if (Array.isArray(data[property])) {
                data[property].map((value, index) => {
                    return fd.append(property + index, value);
                })
            } else if(!(data[property] instanceof File) && typeof data[property] === 'object' && data[property] !== null  ) {
                console.log(data[property])
                let d = JSON.stringify(data[property]);
                fd.append(property, d);
            } else {
                fd.append(property, data[property]);
            }
        }
        return fd;
    }

    createFormBody(data) {
        let formBody = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue;
            if (Array.isArray(data[property])) {
                encodedValue = JSON.stringify(data[property]);
            } else {
                encodedValue = encodeURIComponent(data[property]);
            }
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return formBody;
    }

    setToken(access_token) {
        this.access_token = access_token;
    }

    isAuthTokenValid() {
        if (!this.access_token) {
            return false;
        }
        const decoded = jwtDecode(this.access_token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            console.warn('access token expired');
            return false;
        }
        else {
            return true;
        }
    };

}

const defaultHttpService = new HttpService();
export default defaultHttpService;
