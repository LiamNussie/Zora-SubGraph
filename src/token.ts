import { 
  TokenURIUpdated as TokenURIUpdatedEvent,
  Transfer as TransferEvent,
  Token as TokenContract
} from "../generated/Token/Token"
import {
 Token,
 User
} from "../generated/schema"


export function handleTokenURIUpdated(event: TokenURIUpdatedEvent): void {
  let token = Token.load(event.params._tokenId.toString())
  if(token !== null) {
    token.contentURI = event.params._uri
    token.save()
  }
}

export function handleTransfer(event: TransferEvent): void {
  let token = Token.load(event.params.tokenId.toString())
  if(token == null) {
    token = new Token(event.params.tokenId.toString())
    token.creator = event.params.to.toHexString()
    token.tokenID = event.params. tokenId

    let tokenContract = TokenContract.bind(event.address)
    token.contentURI = tokenContract.tokenURI(event.params.tokenId)
  }
  token.owner = event.params.to.toHexString()
  token.save()

  let user = User.load(event.params.to.toHexString())
  if(user == null) {
    user = new User(event.params.to.toHexString())
    user.save()
  }
}
