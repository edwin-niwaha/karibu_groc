const { createApp } = Vue;
createApp({
    data: function () {
        return {
            tonn1: "",
            prodName: "",
            currentTonnage: 0,
            // tonnageError: "",

        }
    },
    watch: {
        tonn1: function () {
            // this.tonn1 = val;
            // console.log(newValue, oldValue);
            this.fetchData();
        },
        prodName: function () {
            this.fetchData();
        },
        // currentTonnage: function (newValue, oldValue) {
        //     this.updateUIMsg();
        // }
    },
    methods: {
        fetchData() {
            // if (this.tonn1.length > 1) {
                fetch(`http://localhost:8080/fetchProduce?prodName=${this.prodName}`)
                    .then(res => res.json())
                    .then(data => {
                        this.currentTonnage = Object.assign({},data.currentTonnage)})
                    .catch(error => console.log(error))
            // }
        }, 
    //     updateUIMsg(){
    //         // console.log(newValue)
    //         // if(this.tonn1 > this.currentTonnage){
    //             this.tonnageError = Object.assign({},`You preferred tonnage ${this.tonn1} Kgs exceeds ${this.currentTonnage} Kgs in stock`)
    //     // }
    // }
    }
}).mount("#salesfrm")