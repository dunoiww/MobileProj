export let currentCustomer = null; // customer

export function setCustomer(customer) {
    currentCustomer = customer;
}

export function conventVND(money) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
} 