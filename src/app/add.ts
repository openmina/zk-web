import { Field, method, SmartContract, State, state, Permissions, DeployArgs } from 'o1js';

export class Add extends SmartContract {
	@state(Field) num = State<Field>();

	override init(): void {
		// this.account.provedState.assertEquals(this.account.provedState.get());
		// this.account.provedState.get().assertFalse();

		super.init();
		this.num.set(Field(1));
	}

	@method update(): void {
		const currentState = this.num.getAndAssertEquals();
		const newState = currentState.add(2);
		this.num.set(newState);
	}

	override deploy(args: DeployArgs) {
		super.deploy(args);
		// this.account.permissions.set({
		// 	...Permissions.default(),
		// 	setDelegate: Permissions.proof(),
		// 	setPermissions: Permissions.proof(),
		// 	setVerificationKey: Permissions.proof(),
		// 	setZkappUri: Permissions.proof(),
		// 	setTokenSymbol: Permissions.proof(),
		// 	incrementNonce: Permissions.proof(),
		// 	setVotingFor: Permissions.proof(),
		// 	setTiming: Permissions.proof(),
		// 	send: Permissions.proof(),
		// 	editState: Permissions.proof(),
		// 	receive: Permissions.proof(),
		// 	access: Permissions.proof(),
		// 	editActionState: Permissions.proof(),
		// });
	}
}
