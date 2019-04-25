/* Options:
Date: 2019-04-24 23:07:47
Version: 5.51
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://localhost:5000

//GlobalNamespace: 
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion: 
//AddDescriptionAsComments: True
//IncludeTypes: 
//ExcludeTypes: 
//DefaultImports: 
*/


export interface IReturn<T>
{
    createResponse(): T;
}

export interface IReturnVoid
{
    createResponse(): void;
}

export interface IHasSessionId
{
    sessionId: string;
}

export interface IHasBearerToken
{
    bearerToken: string;
}

export interface IPost
{
}

// @DataContract
export class ResponseError
{
    public constructor(init?:Partial<ResponseError>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1, EmitDefaultValue=false)
    public errorCode: string;

    // @DataMember(Order=2, EmitDefaultValue=false)
    public fieldName: string;

    // @DataMember(Order=3, EmitDefaultValue=false)
    public message: string;

    // @DataMember(Order=4, EmitDefaultValue=false)
    public meta: { [index:string]: string; };
}

// @DataContract
export class ResponseStatus
{
    public constructor(init?:Partial<ResponseStatus>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public errorCode: string;

    // @DataMember(Order=2)
    public message: string;

    // @DataMember(Order=3)
    public stackTrace: string;

    // @DataMember(Order=4)
    public errors: ResponseError[];

    // @DataMember(Order=5)
    public meta: { [index:string]: string; };
}

export class HelloResponse
{
    public constructor(init?:Partial<HelloResponse>) { (<any>Object).assign(this, init); }
    public result: string;
    public responseStatus: ResponseStatus;
}

// @DataContract
export class AuthenticateResponse implements IHasSessionId, IHasBearerToken
{
    public constructor(init?:Partial<AuthenticateResponse>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=8)
    public responseStatus: ResponseStatus;

    // @DataMember(Order=1)
    public userId: string;

    // @DataMember(Order=2)
    public sessionId: string;

    // @DataMember(Order=3)
    public userName: string;

    // @DataMember(Order=4)
    public displayName: string;

    // @DataMember(Order=5)
    public referrerUrl: string;

    // @DataMember(Order=6)
    public bearerToken: string;

    // @DataMember(Order=7)
    public refreshToken: string;

    // @DataMember(Order=9)
    public meta: { [index:string]: string; };
}

// @DataContract
export class AssignRolesResponse
{
    public constructor(init?:Partial<AssignRolesResponse>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public allRoles: string[];

    // @DataMember(Order=2)
    public allPermissions: string[];

    // @DataMember(Order=3)
    public responseStatus: ResponseStatus;
}

// @DataContract
export class UnAssignRolesResponse
{
    public constructor(init?:Partial<UnAssignRolesResponse>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public allRoles: string[];

    // @DataMember(Order=2)
    public allPermissions: string[];

    // @DataMember(Order=3)
    public responseStatus: ResponseStatus;
}

// @DataContract
export class RegisterResponse
{
    public constructor(init?:Partial<RegisterResponse>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public userId: string;

    // @DataMember(Order=2)
    public sessionId: string;

    // @DataMember(Order=3)
    public userName: string;

    // @DataMember(Order=4)
    public referrerUrl: string;

    // @DataMember(Order=5)
    public bearerToken: string;

    // @DataMember(Order=6)
    public refreshToken: string;

    // @DataMember(Order=7)
    public responseStatus: ResponseStatus;

    // @DataMember(Order=8)
    public meta: { [index:string]: string; };
}

// @Route("/hello")
// @Route("/hello/{Name}")
export class Hello implements IReturn<HelloResponse>
{
    public constructor(init?:Partial<Hello>) { (<any>Object).assign(this, init); }
    public name: string;
    public createResponse() { return new HelloResponse(); }
    public getTypeName() { return 'Hello'; }
}

// @Route("/auth")
// @Route("/auth/{provider}")
// @Route("/authenticate")
// @Route("/authenticate/{provider}")
// @DataContract
export class Authenticate implements IReturn<AuthenticateResponse>, IPost
{
    public constructor(init?:Partial<Authenticate>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public provider: string;

    // @DataMember(Order=2)
    public state: string;

    // @DataMember(Order=3)
    public oauth_token: string;

    // @DataMember(Order=4)
    public oauth_verifier: string;

    // @DataMember(Order=5)
    public userName: string;

    // @DataMember(Order=6)
    public password: string;

    // @DataMember(Order=7)
    public rememberMe: boolean;

    // @DataMember(Order=8)
    public continue: string;

    // @DataMember(Order=9)
    public errorView: string;

    // @DataMember(Order=10)
    public nonce: string;

    // @DataMember(Order=11)
    public uri: string;

    // @DataMember(Order=12)
    public response: string;

    // @DataMember(Order=13)
    public qop: string;

    // @DataMember(Order=14)
    public nc: string;

    // @DataMember(Order=15)
    public cnonce: string;

    // @DataMember(Order=16)
    public useTokenCookie: boolean;

    // @DataMember(Order=17)
    public accessToken: string;

    // @DataMember(Order=18)
    public accessTokenSecret: string;

    // @DataMember(Order=19)
    public meta: { [index:string]: string; };
    public createResponse() { return new AuthenticateResponse(); }
    public getTypeName() { return 'Authenticate'; }
}

// @Route("/assignroles")
// @DataContract
export class AssignRoles implements IReturn<AssignRolesResponse>, IPost
{
    public constructor(init?:Partial<AssignRoles>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public userName: string;

    // @DataMember(Order=2)
    public permissions: string[];

    // @DataMember(Order=3)
    public roles: string[];
    public createResponse() { return new AssignRolesResponse(); }
    public getTypeName() { return 'AssignRoles'; }
}

// @Route("/unassignroles")
// @DataContract
export class UnAssignRoles implements IReturn<UnAssignRolesResponse>, IPost
{
    public constructor(init?:Partial<UnAssignRoles>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public userName: string;

    // @DataMember(Order=2)
    public permissions: string[];

    // @DataMember(Order=3)
    public roles: string[];
    public createResponse() { return new UnAssignRolesResponse(); }
    public getTypeName() { return 'UnAssignRoles'; }
}

// @Route("/register")
// @DataContract
export class Register implements IReturn<RegisterResponse>, IPost
{
    public constructor(init?:Partial<Register>) { (<any>Object).assign(this, init); }
    // @DataMember(Order=1)
    public userName: string;

    // @DataMember(Order=2)
    public firstName: string;

    // @DataMember(Order=3)
    public lastName: string;

    // @DataMember(Order=4)
    public displayName: string;

    // @DataMember(Order=5)
    public email: string;

    // @DataMember(Order=6)
    public password: string;

    // @DataMember(Order=7)
    public confirmPassword: string;

    // @DataMember(Order=8)
    public autoLogin: boolean;

    // @DataMember(Order=9)
    public continue: string;

    // @DataMember(Order=10)
    public errorView: string;
    public createResponse() { return new RegisterResponse(); }
    public getTypeName() { return 'Register'; }
}

