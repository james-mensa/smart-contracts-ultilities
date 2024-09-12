/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface BankAccountInterface extends utils.Interface {
  functions: {
    "approveWithdrawl(uint256,uint256)": FunctionFragment;
    "createAccount(address[])": FunctionFragment;
    "deposit(uint256)": FunctionFragment;
    "depositEth()": FunctionFragment;
    "getAccounts()": FunctionFragment;
    "getApprovals(uint256,uint256)": FunctionFragment;
    "getBal()": FunctionFragment;
    "getBalance(uint256)": FunctionFragment;
    "getOwners(uint256)": FunctionFragment;
    "getwalletBalance(address)": FunctionFragment;
    "requestWithdrawl(uint256,uint256)": FunctionFragment;
    "sendEther(address)": FunctionFragment;
    "sendMoney(address,uint256)": FunctionFragment;
    "transferEther(address,uint256)": FunctionFragment;
    "withdraw(uint256,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "approveWithdrawl"
      | "createAccount"
      | "deposit"
      | "depositEth"
      | "getAccounts"
      | "getApprovals"
      | "getBal"
      | "getBalance"
      | "getOwners"
      | "getwalletBalance"
      | "requestWithdrawl"
      | "sendEther"
      | "sendMoney"
      | "transferEther"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "approveWithdrawl",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "createAccount",
    values: [PromiseOrValue<string>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "depositEth",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getAccounts",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getApprovals",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "getBal", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getBalance",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getOwners",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getwalletBalance",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "requestWithdrawl",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "sendEther",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "sendMoney",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferEther",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "approveWithdrawl",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createAccount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "depositEth", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAccounts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getApprovals",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getBal", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getBalance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getOwners", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getwalletBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "requestWithdrawl",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "sendEther", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sendMoney", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferEther",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "AccountCreated(address[],uint256,uint256)": EventFragment;
    "Deposit(address,uint256,uint256,uint256)": EventFragment;
    "Log(string,uint256)": EventFragment;
    "Withdraw(uint256,uint256)": EventFragment;
    "WithdrawRequested(address,uint256,uint256,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AccountCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Log"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdraw"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WithdrawRequested"): EventFragment;
}

export interface AccountCreatedEventObject {
  owners: string[];
  id: BigNumber;
  timestamp: BigNumber;
}
export type AccountCreatedEvent = TypedEvent<
  [string[], BigNumber, BigNumber],
  AccountCreatedEventObject
>;

export type AccountCreatedEventFilter = TypedEventFilter<AccountCreatedEvent>;

export interface DepositEventObject {
  user: string;
  accountId: BigNumber;
  value: BigNumber;
  timestamp: BigNumber;
}
export type DepositEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber],
  DepositEventObject
>;

export type DepositEventFilter = TypedEventFilter<DepositEvent>;

export interface LogEventObject {
  func: string;
  gas: BigNumber;
}
export type LogEvent = TypedEvent<[string, BigNumber], LogEventObject>;

export type LogEventFilter = TypedEventFilter<LogEvent>;

export interface WithdrawEventObject {
  withdrawId: BigNumber;
  timestamp: BigNumber;
}
export type WithdrawEvent = TypedEvent<
  [BigNumber, BigNumber],
  WithdrawEventObject
>;

export type WithdrawEventFilter = TypedEventFilter<WithdrawEvent>;

export interface WithdrawRequestedEventObject {
  user: string;
  accountId: BigNumber;
  withdrawId: BigNumber;
  amount: BigNumber;
  timestamp: BigNumber;
}
export type WithdrawRequestedEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber, BigNumber],
  WithdrawRequestedEventObject
>;

export type WithdrawRequestedEventFilter =
  TypedEventFilter<WithdrawRequestedEvent>;

export interface BankAccount extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BankAccountInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    approveWithdrawl(
      accountId: PromiseOrValue<BigNumberish>,
      withdrawId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createAccount(
      otherOwners: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    deposit(
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    depositEth(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAccounts(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    getApprovals(
      accountId: PromiseOrValue<BigNumberish>,
      withdrawId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getBal(overrides?: CallOverrides): Promise<[BigNumber]>;

    getBalance(
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getOwners(
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    getwalletBalance(
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { accountBalance: BigNumber }>;

    requestWithdrawl(
      accountId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    sendEther(
      recipient: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    sendMoney(
      to: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferEther(
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      accountId: PromiseOrValue<BigNumberish>,
      withdrawId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  approveWithdrawl(
    accountId: PromiseOrValue<BigNumberish>,
    withdrawId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createAccount(
    otherOwners: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  deposit(
    accountId: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  depositEth(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAccounts(overrides?: CallOverrides): Promise<BigNumber[]>;

  getApprovals(
    accountId: PromiseOrValue<BigNumberish>,
    withdrawId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getBal(overrides?: CallOverrides): Promise<BigNumber>;

  getBalance(
    accountId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getOwners(
    accountId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string[]>;

  getwalletBalance(
    owner: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  requestWithdrawl(
    accountId: PromiseOrValue<BigNumberish>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  sendEther(
    recipient: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  sendMoney(
    to: PromiseOrValue<string>,
    value: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferEther(
    recipient: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    accountId: PromiseOrValue<BigNumberish>,
    withdrawId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    approveWithdrawl(
      accountId: PromiseOrValue<BigNumberish>,
      withdrawId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    createAccount(
      otherOwners: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<void>;

    deposit(
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    depositEth(overrides?: CallOverrides): Promise<void>;

    getAccounts(overrides?: CallOverrides): Promise<BigNumber[]>;

    getApprovals(
      accountId: PromiseOrValue<BigNumberish>,
      withdrawId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getBal(overrides?: CallOverrides): Promise<BigNumber>;

    getBalance(
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOwners(
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string[]>;

    getwalletBalance(
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    requestWithdrawl(
      accountId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    sendEther(
      recipient: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    sendMoney(
      to: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferEther(
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(
      accountId: PromiseOrValue<BigNumberish>,
      withdrawId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AccountCreated(address[],uint256,uint256)"(
      owners?: null,
      id?: PromiseOrValue<BigNumberish> | null,
      timestamp?: null
    ): AccountCreatedEventFilter;
    AccountCreated(
      owners?: null,
      id?: PromiseOrValue<BigNumberish> | null,
      timestamp?: null
    ): AccountCreatedEventFilter;

    "Deposit(address,uint256,uint256,uint256)"(
      user?: PromiseOrValue<string> | null,
      accountId?: PromiseOrValue<BigNumberish> | null,
      value?: null,
      timestamp?: null
    ): DepositEventFilter;
    Deposit(
      user?: PromiseOrValue<string> | null,
      accountId?: PromiseOrValue<BigNumberish> | null,
      value?: null,
      timestamp?: null
    ): DepositEventFilter;

    "Log(string,uint256)"(func?: null, gas?: null): LogEventFilter;
    Log(func?: null, gas?: null): LogEventFilter;

    "Withdraw(uint256,uint256)"(
      withdrawId?: PromiseOrValue<BigNumberish> | null,
      timestamp?: null
    ): WithdrawEventFilter;
    Withdraw(
      withdrawId?: PromiseOrValue<BigNumberish> | null,
      timestamp?: null
    ): WithdrawEventFilter;

    "WithdrawRequested(address,uint256,uint256,uint256,uint256)"(
      user?: PromiseOrValue<string> | null,
      accountId?: PromiseOrValue<BigNumberish> | null,
      withdrawId?: PromiseOrValue<BigNumberish> | null,
      amount?: null,
      timestamp?: null
    ): WithdrawRequestedEventFilter;
    WithdrawRequested(
      user?: PromiseOrValue<string> | null,
      accountId?: PromiseOrValue<BigNumberish> | null,
      withdrawId?: PromiseOrValue<BigNumberish> | null,
      amount?: null,
      timestamp?: null
    ): WithdrawRequestedEventFilter;
  };

  estimateGas: {
    approveWithdrawl(
      accountId: PromiseOrValue<BigNumberish>,
      withdrawId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createAccount(
      otherOwners: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    deposit(
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    depositEth(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAccounts(overrides?: CallOverrides): Promise<BigNumber>;

    getApprovals(
      accountId: PromiseOrValue<BigNumberish>,
      withdrawId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getBal(overrides?: CallOverrides): Promise<BigNumber>;

    getBalance(
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOwners(
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getwalletBalance(
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    requestWithdrawl(
      accountId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    sendEther(
      recipient: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    sendMoney(
      to: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferEther(
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdraw(
      accountId: PromiseOrValue<BigNumberish>,
      withdrawId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    approveWithdrawl(
      accountId: PromiseOrValue<BigNumberish>,
      withdrawId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createAccount(
      otherOwners: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    deposit(
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    depositEth(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAccounts(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getApprovals(
      accountId: PromiseOrValue<BigNumberish>,
      withdrawId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getBal(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getBalance(
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOwners(
      accountId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getwalletBalance(
      owner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    requestWithdrawl(
      accountId: PromiseOrValue<BigNumberish>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    sendEther(
      recipient: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    sendMoney(
      to: PromiseOrValue<string>,
      value: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferEther(
      recipient: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      accountId: PromiseOrValue<BigNumberish>,
      withdrawId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
