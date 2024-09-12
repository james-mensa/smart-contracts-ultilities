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
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface ElectionInterface extends utils.Interface {
  functions: {
    "candidates(uint256)": FunctionFragment;
    "delegate(address)": FunctionFragment;
    "getCandidates()": FunctionFragment;
    "getParties()": FunctionFragment;
    "getVoterDetails(address)": FunctionFragment;
    "giveRightToVote(address)": FunctionFragment;
    "poolParties(uint256)": FunctionFragment;
    "vote(uint256)": FunctionFragment;
    "voters(address)": FunctionFragment;
    "winningProposal()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "candidates"
      | "delegate"
      | "getCandidates"
      | "getParties"
      | "getVoterDetails"
      | "giveRightToVote"
      | "poolParties"
      | "vote"
      | "voters"
      | "winningProposal"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "candidates",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "delegate",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getCandidates",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getParties",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getVoterDetails",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "giveRightToVote",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "poolParties",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "vote",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "voters",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "winningProposal",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "candidates", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "delegate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getCandidates",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getParties", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getVoterDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "giveRightToVote",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "poolParties",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "vote", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "voters", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "winningProposal",
    data: BytesLike
  ): Result;

  events: {};
}

export interface Election extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ElectionInterface;

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
    candidates(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { name: string; voteCount: BigNumber }>;

    delegate(
      to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getCandidates(
      overrides?: CallOverrides
    ): Promise<
      [string[], BigNumber[]] & {
        candidateNames: string[];
        voteCounts: BigNumber[];
      }
    >;

    getParties(
      overrides?: CallOverrides
    ): Promise<[string[]] & { parties: string[] }>;

    getVoterDetails(
      voter: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [boolean, string, BigNumber, string[], BigNumber] & {
        voted_: boolean;
        delegate_: string;
        vote_: BigNumber;
        authorizedBy: string[];
        weight_: BigNumber;
      }
    >;

    giveRightToVote(
      voter: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    poolParties(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    vote(
      candidate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    voters(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [boolean, string, BigNumber, BigNumber] & {
        voted: boolean;
        delegate: string;
        vote: BigNumber;
        weight: BigNumber;
      }
    >;

    winningProposal(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        winningProposal_: BigNumber;
        totalVotes: BigNumber;
      }
    >;
  };

  candidates(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber] & { name: string; voteCount: BigNumber }>;

  delegate(
    to: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getCandidates(
    overrides?: CallOverrides
  ): Promise<
    [string[], BigNumber[]] & {
      candidateNames: string[];
      voteCounts: BigNumber[];
    }
  >;

  getParties(overrides?: CallOverrides): Promise<string[]>;

  getVoterDetails(
    voter: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [boolean, string, BigNumber, string[], BigNumber] & {
      voted_: boolean;
      delegate_: string;
      vote_: BigNumber;
      authorizedBy: string[];
      weight_: BigNumber;
    }
  >;

  giveRightToVote(
    voter: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  poolParties(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  vote(
    candidate: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  voters(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [boolean, string, BigNumber, BigNumber] & {
      voted: boolean;
      delegate: string;
      vote: BigNumber;
      weight: BigNumber;
    }
  >;

  winningProposal(
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber] & {
      winningProposal_: BigNumber;
      totalVotes: BigNumber;
    }
  >;

  callStatic: {
    candidates(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { name: string; voteCount: BigNumber }>;

    delegate(
      to: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    getCandidates(
      overrides?: CallOverrides
    ): Promise<
      [string[], BigNumber[]] & {
        candidateNames: string[];
        voteCounts: BigNumber[];
      }
    >;

    getParties(overrides?: CallOverrides): Promise<string[]>;

    getVoterDetails(
      voter: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [boolean, string, BigNumber, string[], BigNumber] & {
        voted_: boolean;
        delegate_: string;
        vote_: BigNumber;
        authorizedBy: string[];
        weight_: BigNumber;
      }
    >;

    giveRightToVote(
      voter: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    poolParties(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    vote(
      candidate: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    voters(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [boolean, string, BigNumber, BigNumber] & {
        voted: boolean;
        delegate: string;
        vote: BigNumber;
        weight: BigNumber;
      }
    >;

    winningProposal(
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber] & {
        winningProposal_: BigNumber;
        totalVotes: BigNumber;
      }
    >;
  };

  filters: {};

  estimateGas: {
    candidates(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    delegate(
      to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getCandidates(overrides?: CallOverrides): Promise<BigNumber>;

    getParties(overrides?: CallOverrides): Promise<BigNumber>;

    getVoterDetails(
      voter: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    giveRightToVote(
      voter: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    poolParties(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    vote(
      candidate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    voters(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    winningProposal(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    candidates(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    delegate(
      to: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getCandidates(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getParties(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getVoterDetails(
      voter: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    giveRightToVote(
      voter: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    poolParties(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    vote(
      candidate: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    voters(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    winningProposal(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
