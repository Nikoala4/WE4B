import { Account } from "../api-objs/Account"

export interface ApiLogInfoResponse {
    connected: boolean
    account?: Account
}
