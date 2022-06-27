if (!window.Notification.notify) throw new Error(`Require "Notification" module.`)

function numberToHexFormat(number) {
    if (isNaN(number)) throw new Error("Can only transform numbers to hex format.", number)
    return "0x" + number.toString(16)
}

var Networks = {
    1666600000: {
        chainId: numberToHexFormat(1666600000),
        chainName: "Harmony Mainnet",
        nativeCurrency: {
            name: "Harmony One",
            symbol: "ONE",
            decimals: 18
        },
        rpcUrls: [
            "https://api.s0.t.hmny.io"
        ],
        blockExplorerUrls: [
            "https://explorer.harmony.one"
        ]
    },
    1666700000: {
        chainId: numberToHexFormat(1666700000),
        chainName: "Harmony Testnet",
        nativeCurrency: {
            name: "Harmony Testnet One",
            symbol: "tONE",
            decimals: 18
        },
        rpcUrls: [
            "https://api.s0.b.hmny.io"
        ],
        blockExplorerUrls: [
            "https://explorer.pops.one/"
        ]
    },
    1666900000: {
        chainId: numberToHexFormat(1666900000),
        chainName: "Harmony Devnet",
        nativeCurrency: {
            name: "Harmony Devnet One",
            symbol: "dONE",
            decimals: 18
        },
        rpcUrls: [
            "https://api.s0.ps.hmny.io"
        ],
        blockExplorerUrls: [
            "https://explorer.ps.hmny.io"
        ]
    }
}


class Wallet {

    constructor({
        accountChanged = () => { },
        chainChanged = () => { },
        changed = () => { }
    } = {}) {
        this.account = null
        this.network = null
        this.changed = changed
        this.accountChanged = accountChanged
        this.chainChanged = chainChanged

        this._handleWalletButtonClicked = this._handleWalletButtonClicked.bind(this)
        this._initWalletButtons()

        this.onChainChanged = this.onChainChanged.bind(this)
        this.onAccountChanged = this.onAccountChanged.bind(this)
        this.onDisconnect = this.onDisconnect.bind(this)



        this.metamaskAvailable = this._checkIfMetaMaskIsInstalled()
        Wallet.instance = this
    }

    async init() {
        this._update()
        await this._connect()
    }

    _checkIfMetaMaskIsInstalled() {
        //Check if we have any injected ethereum provider:
        if (typeof window.ethereum !== 'undefined') {

            //Check if the injected ethereum provider is MetaMask:
            if (window.ethereum.isMetaMask) {
                return true
            }
        }
        return false
    }


    /**
     * Connects to wallet to the website on concurrent visits, without prompting the user
     * with the MetaMask popup.
     */
    async _connect() {
        if (!this.account) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                this.account = accounts[0]
                this.network = await ethereum.request({ method: 'net_version' })

                ethereum.on("chainChanged", this.onChainChanged)
                ethereum.on("accountsChanged", this.onAccountChanged)
                ethereum.on("disconnect", this.onDisconnect)


            } catch (e) {
                Notification.notify(e, { type: Notification.Type.ERROR })
            }
            this._update()
        }
    }

    /**
      * Artificially disconnects the wallet from the page. The wallet still remains accessible
      * and the permission in MetaMask is not revoked!
      */
    async disconnect() {
        this.account = null
        ethereum.removeListener("chainChanged", onChainChanged)
        ethereum.removeListener("accountsChanged", onAccountChanged)
        this.ethereum = null
    }

    /**
     * Can be called from code to change/add the current chain.
     * @param {number} chainId 
     */
    async changeChain(chainId) {

        if (window.ethereum) {
            const supportedNetwork = Networks[chainId]
            if (!supportedNetwork) {
                try {
                    await ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: numberToHexFormat(chainId) }]
                    })
                } catch (e) {
                    console.log(e)
                    Notification.notify(e.message, { type: Notification.Type.ERROR })
                }
            } else {
                try {
                    await ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [supportedNetwork]
                    })
                } catch (e) {
                    Notification.notify(e.message, { type: Notification.Type.ERROR })
                }
            }
        }
    }

    _update() {
        this._updateWalletButtons()
        this.changed(this)
    }

    onChainChanged(chainId) {
        const old = this.network
        this.network = parseInt(chainId, 16)
        this._update()
        this.chainChanged(chainId, old)
    }

    onAccountChanged(accounts) {
        const old = this.account
        this.account = accounts[0]
        this._update()
        this.accountChanged(this.account, old)
    }

    onDisconnect() {
        this.account = null
        this.network = null
        this._update()
    }

    /**
     * The 'connect' method assumes, there is already an connection and does not print
     * the MetaMask interface when being called. Which allows that we have the account 
     * correctly setup when we revisit the site.
     * 
     * When the wallet is not connected and we want to connect it, the 'connect' method
     * is not sufficiant, as it doesn't show the MetaMask popup. Therefore we use the 'buttonConnect'
     * to explicitly open the MetaMask poup.
     */
    async buttonConnect() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        this._connect();
    }



    _updateWalletButtons() {
        document.querySelectorAll(".wallet").forEach(button => {
            this._updateButton(button)
        })
    }

    async _handleWalletButtonClicked() {
        await this.buttonConnect()
    }

    _initWalletButtons() {
        const walletButtons = document.querySelectorAll(".wallet-button")
        walletButtons.forEach(button => button.addEventListener("click", this._handleWalletButtonClicked))
    }

    /**
    * Updates the frontend to match the current state!
    */
    _updateButton(button) {
        const walletButton = button.querySelector(".wallet-button")
        const networkContainer = button.querySelector(".network")
        const addressContainer = button.querySelector(".address")

        if (this._checkIfMetaMaskIsInstalled() && this.account) {
            walletButton.style.display = "none"
            networkContainer.style.display = "block"
            addressContainer.style.display = "block"

            if (this.network) {
                networkContainer.style.display = "block"

                if (Networks[this.network]) {
                    networkContainer.textContent = Networks[this.network].chainName
                } else {
                    networkContainer.textContent = this.network
                }
            } else {
                networkContainer.style.display = "none"
            }

            if (this.account) {
                const length = 4
                addressContainer.textContent = this.account.slice(0, 2 + length) + "... " + this.account.slice(this.account.length - length)
                addressContainer.style.display = "block"
            } else {
                addressContainer.textContent = "-"
                addressContainer.style.display = "none"
            }
        } else {
            networkContainer.style.display = "none"
            addressContainer.style.display = "none"

            if (!this._checkIfMetaMaskIsInstalled()) {
                walletButton.textContent = "MetaMask Not Installed"
                walletButton.style.display = "flex"
                walletButton.setAttribute("disabled", true)
            }
            else if (!this.account) {
                walletButton.textContent = "Connect"
                walletButton.style.display = "flex"
                walletButton.removeAttribute("disabled")
            }
        }

    }
}

window.Wallet = Wallet
