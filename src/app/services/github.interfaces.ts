export class GithubPage {

    'pageOffset': number;
    'perPageCount': number;
    'results': GithubResult[];
    'totalCount':  number;
    'totalPages':  number;

}

export class GithubResult {

    'avatarUrl': string;
    'created': Date; // "2018-05-29T12:40:01"
    'description': string;
    'highlightText': string;
    'forkCount': number;
    'language': string;
    'name': string;
    'owner': string;
    'starCount': number;
    'url': string;
    'watcherCount':  number;
    'topics': string[];
    'id': string;
}

export class ApiError {
    status: string;
    timestamp: string;
    message: string;
    debugMessage: string;
    subErrors: string[];
}

export class ErrorPayload {

    constructor(data: any) {
        this._body = data['_body'];
        this.status =  data.status;
        this.ok  = data.okay;
        this.statusText  = data.statusText;
        this.headers  = data.headers;
        this.type  = data.type;
        this.url  = data.url;
        const a: any =  JSON.parse(data['_body']);
        this.apiError = a['apierror'];

    }

    _body: string;
    status: number;
    ok: string;
    statusText: string;
    headers: any;
    type: number;
    url: string;
    apiError: ApiError;



}


