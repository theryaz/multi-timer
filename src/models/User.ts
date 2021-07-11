export class User{
	public uid: string;
	public providerId: string | null;
	public photoURL: string | null;
	public displayName: string | null;
	public email: string | null;
	public isAnonymous?: boolean = false;
	public isMobile?: boolean = false;
	
	constructor({
		uid,
		providerId,
		photoURL,
		displayName,
		email,
		isAnonymous = false,
		isMobile = false,
	}: User){
		this.uid = uid;
		this.providerId = providerId;
		this.photoURL = photoURL;
		this.displayName = displayName;
		this.email = email;
		this.isAnonymous = isAnonymous;
		this.isMobile = isMobile;
	}
	
}