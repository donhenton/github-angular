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
    'forkCount': number;
    'language': string;
    'name': string;
    'owner': string;
    'starCount': number;
    'url': string;
    'watcherCount':  number;
    'topics': string[];

}


