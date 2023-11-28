import {
	Field,
	SmartContract,
	state,
	State,
	method,
	DeployArgs,
	Permissions,
} from 'o1js';

export class SecondaryZkApp extends SmartContract {
	@state(Field) num = State<Field>();

	override deploy(args: DeployArgs) {
		super.deploy(args);
		this.account.permissions.set({
			...Permissions.default(),
		});
	}

	@method
	override init() {
		this.account.provedState.assertEquals(this.account.provedState.get());
		this.account.provedState.get().assertFalse();

		super.init();
		this.num.set(Field(12));
	}

	@method add(incrementBy: Field) {
		this.account.provedState.assertEquals(this.account.provedState.get());
		this.account.provedState.get().assertTrue();

		const num = this.num.get();
		this.num.assertEquals(num);
		this.num.set(num.add(incrementBy));
	}
}
