if (!window.Notification.notify) throw new Error('[TIP PLUGIN] Require "Notification" plugin.')
if (!window.Wallet) throw new Error('[TIP PLUGIN] Require "Wallet" plugin.')
if (!window.Button) throw new Error('[TIP PLUGIN] Require "Button" plugin.')
if (!window.ethers) throw new Error('[TIP PLUGIN] Require ethersjs.')


const paymentSplitterABI = [
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "payees",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "shares_",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "payable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "contract IERC20",
                "name": "token",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "ERC20PaymentReleased",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "shares",
                "type": "uint256"
            }
        ],
        "name": "PayeeAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "PaymentReceived",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "PaymentReleased",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "payee",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "payeesCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "pendingPayment",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "pendingPayment",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "release",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "release",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "released",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "released",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "shares",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract IERC20",
                "name": "token",
                "type": "address"
            }
        ],
        "name": "totalReleased",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalReleased",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalShares",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]

class Tip {

    static selector = ".tipping-jar"
    static contentSelector = ".tipping-jar-content"
    static viewSelector = ".tipping-view"
    static receiversSelector = ".tipping-jar-receivers"
    static inputSelector = ".tipping-jar-tip-input"
    static tipButtonSelector = ".tipping-jar-tip-button"

    static namedAddresses = {
        "0x8333B6BCa185fbA98A394EB0eD7A50DC42e47E2b": "DevDAO MultiSig"
    }

    static getElement(selector) {
        const tipElement = this.getTipElement()
        return tipElement.querySelector(selector)
    }

    static getTipElement() {
        const elements = document.querySelectorAll(this.selector)
        if (elements.length != 1) throw new Error(`[TIP PLUGIN] There needs to be exactly one tip element!`)
        return elements[0]
    }

    static getTipContentElement() {
        const tipElement = this.getTipElement()
        return tipElement.querySelector(this.contentSelector)
    }

    static getViewElement() {
        const tipElement = this.getTipElement()
        return tipElement.querySelector(this.viewSelector)
    }

    static getReceiversElement() {
        const tipElement = this.getTipElement()
        return tipElement.querySelector(this.receiversSelector)
    }

    static getInputElement() {
        const tipElement = this.getTipElement()
        return tipElement.querySelector(this.inputSelector)
    }

    static createElement() {
        const tippingJar = document.createElement("div")
        tippingJar.className = this.selector.replace(".", "")

        tippingJar.innerHTML = `
                <div class="tipping-jar-content">
            <div class="tipping-view">
                <h2>💙 Show Some Love</h2>
                <input class="tipping-jar-tip-input" type="number" value="10">
                <ul class="tipping-jar-receivers"></ul>
                <button class="async-button tipping-jar-tip-button">
                    <div class="spinner"></div>
                    Tip
                </button>
            </div>
        </div>

            <button class="floating-button button"></button>
    `
        return tippingJar

    }

    static init(contract, wallet) {
        this.contract = contract
        this.wallet = wallet
        const tipElement = this.getTipElement()
        const toggle = tipElement.querySelector(".floating-button")
        toggle.addEventListener("click", this.toggle.bind(this))

        const button = this.getElement(this.tipButtonSelector)
        button.addEventListener("click", this.tip.bind(this))

        this.update()
    }

    static async update() {
        const content = this.getTipContentElement()
        const view = this.getViewElement()
        const receviers = this.getReceiversElement()
        if (Wallet?.instance?.network != "1666600000") {
            view.style.display = "none"
            receviers.innerHTML = ""
            const button = document.getElementById("tipping-jar-network-button")
            if (!button) {
                const button = document.createElement("button")
                button.textContent = "Switch To Mainnet"
                button.id = "tipping-jar-network-button"
                button.addEventListener("click", this.changeToMainnet)
                content.appendChild(button)
            }
        } else {
            const button = document.getElementById("tipping-jar-network-button")
            if (button) {
                button.removeEventListener("click", this.changeToMainnet)
                content.removeChild(button)
            }
            view.style.display = "block"

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new window.ethers.Contract(this.contract, paymentSplitterABI, provider)
            const payeesCount = (await contract.payeesCount()).toNumber()
            const totalShares = await contract.totalShares()

            const BigNumber = window.ethers.BigNumber

            const payees = []
            for (let i = 0; i < payeesCount; i++) {
                const payee = await contract.payee(i)
                const payeeShares = await contract.shares(payee)

                payees.push({
                    address: payee,
                    share: payeeShares,
                })
            }

            payees.forEach(({ address, share }) => {
                const shares = (share.mul(BigNumber.from(1000)).div(totalShares)).toNumber()
                const percent = parseFloat((shares / 10).toFixed(2)) + "%" // the parsefloat removes trailing zeroes

                const receiverRow = document.createElement("li")
                receiverRow.className = "tipping-jar-receiver-row"

                const addressLink = document.createElement("a")
                if (this.namedAddresses[address]) {
                    addressLink.textContent = percent + " - " + this.namedAddresses[address] 
                } else {
                    addressLink.textContent = percent + " - " + address.substr(0, 7) + "..." + address.substr(-5)
                }
                addressLink.href = "https://explorer.harmony.one/address/" + address
                receiverRow.appendChild(addressLink)
                receviers.appendChild(receiverRow)
            })


        }
    }

    static async tip(event) {

        const input = this.getInputElement()

        if (input.value > 0) {
            const button = this.getElement(this.tipButtonSelector)
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const promise = signer.sendTransaction({
                to: this.contract,
                value: ethers.utils.parseEther(input.value)
            })

            Button.waitForPromise(button, promise)

        }


    }

    static async changeToMainnet(evt) {
        console.log("CHANGE TO MAINNET")
        const button = evt.currentTarget
        button.classList.add("waiting")
        try {
            await Wallet.instance.changeChain("1666600000")
        } catch (e) {
            Notification.notify(e, Notifications.Error)
        }
        button.classList.remove("waiting")
    }

    static toggle(evt) {
        const button = evt.currentTarget
        const tipElement = this.getTipElement()
        tipElement.classList.toggle("open")

    }

    static open() {
        document.querySelector("")
    }
}

window.Tip = Tip