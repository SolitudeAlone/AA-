import {
    SUBMISSION,
    DELETEDASK,
    SUBMIS,
    SETTLE
} from "./action.js";
let not = (state) => {
    let nums = 0;
    state.data.map((item, index) => {
        state.datas.map((stateitem, stateindex) => {
            if (item.name === stateitem.asyncValue) {
                nums = nums + stateitem.money * 1
            }
        })
    })
    return nums
}
const otype = {
    [SUBMISSION](state, action) {
        state.data = action.data;
        state.datas = action.datas;
        state.data.map((item) => {
            let money = state.datas.reduce((pre, next) => {
                let moneys = next.asyncValue === item.name ? next.money : 0
                return pre * 1 + moneys * 1
            }, 0)
            item.price = money
        })
        state.asyncsum = not(state)
    },
    [DELETEDASK](state, action) {
        state.ishow = action.ishow;

    },
    [SUBMIS](state, action) {
        state.datas = action.notde
        let asyncname = action.dataSet && action.dataSet.asyncValue;
        state.data.map((item, key) => {
            if (item.name === asyncname) {
                state.data[key].price = state.data[key].price * 1 + action.dataSet.money * 1
            }
        })
        state.asyncsum = not(state)
    },
    [SETTLE](state, action) {
        state.settleDATA = [];
        let AverageSum = 0;
        state.data.map((item, index) => {
            let settleDATA = {
                name: "",
                price: "",
                Average: 0,
                copeWith: 0,
                receivable: 0
            };
            settleDATA.name = item.name;
            settleDATA.price = item.price;
            AverageSum += item.price * 1;
            state.settleDATA.push(settleDATA);
        });
        let Averages = Math.floor(AverageSum / state.data.length);
        state.settleDATA.map((item, index) => {
            item.Average = Averages;
            if (item.price > item.Average) {
                item.copeWith = 0;
                item.receivable = item.price * 1 - item.Average * 1;
            } else {
                item.copeWith = item.Average * 1 - item.price * 1;
                item.receivable = 0;
            }
        });
    }
};

const list = (
    state = { data: [], ishow: null, datas: [], sum: 0, settleDATA: [], asyncsum: 0 },
    action
) => {
    otype[action.type] && otype[action.type](state, action);
    return {...state, data: [...state.data] };
};
export default list;