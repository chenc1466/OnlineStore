// 商品資料
const products = [
    { id: 1, name: '劇本1', price: 1, img: 'src/icon.png', desc: '描述高冷理性的理工女大學生' },
    { id: 2, name: '劇本2', price: 1, img: 'src/icon.png', desc: '描述感情細膩的男大二學生' },
    { id: 3, name: '劇本3', price: 1, img: 'src/icon.png', desc: '描述富有同情心的女大學生' },
    { id: 4, name: '劇本4', price: 1, img: 'src/icon.png', desc: '描述聰明的男醫學生' },
    { id: 5, name: '劇本5', price: 1, img: 'src/icon.png', desc: '描述高冷理性的理工女碩士生' },
    { id: 6, name: '劇本6', price: 1, img: 'src/icon.png', desc: '描述安靜細心的男碩士生' },
    { id: 7, name: '劇本7', price: 1, img: 'src/icon.png', desc: '描述一位女碩士生' },
    { id: 8, name: '劇本8', price: 1, img: 'src/icon.png', desc: '描述一位男碩士生' },
    { id: 9, name: '零食貨架', price: 1, img: 'src/icon.png', desc: '上面有很多好吃的零食' },
    { id: 10, name: '相片四張', price: 1, img: 'src/icon.png', desc: '教授與女兒的合照' },
    { id: 11, name: '拼圖', price: 1, img: 'src/icon.png', desc: '等待拼起來的那一刻' },
    { id: 12, name: '基因序列', price: 1, img: 'src/icon.png', desc: '就是基因序列' },
    { id: 13, name: '史詩樂章', price: 1, img: 'src/icon.png', desc: '三段知名樂曲組成' },
    { id: 14, name: '文字謎', price: 1, img: 'src/icon.png', desc: '高速隨身碟' },
    { id: 15, name: '哉物報', price: 1, img: 'src/icon.png', desc: '紀錄大小事' },
    { id: 16, name: '藥水材料數個', price: 1, img: 'src/icon.png', desc: '神秘稀缺的藥材' },
    { id: 17, name: '計算紙', price: 1, img: 'src/icon.png', desc: '很多惱人的公式' },
    { id: 18, name: '研究員日誌*2', price: 1, img: 'src/icon.png', desc: '某藥水的配方' },
    { id: 19, name: '細胞模型', price: 1, img: 'src/icon.png', desc: '顯微鏡下的世界' },
    { id: 20, name: '蛋白行進圖', price: 1, img: 'src/icon.png', desc: '有點像恐龍的東東' },
    { id: 21, name: '元素週期表', price: 1, img: 'src/icon.png', desc: '好像不是平常看到的週期表' },
    { id: 22, name: '筆記紙四頁', price: 1, img: 'src/icon.png', desc: '文化小筆記' },
    { id: 23, name: '卡牌一副', price: 1, img: 'src/icon.png', desc: '你想打牌了嗎' },
    { id: 24, name: '一元', price: 0, img: 'src/icon.png', desc: '我知道你想說冷笑話' },
    { id: 25, name: '一元', price: 0, img: 'src/icon.png', desc: '還是你要表演才藝' }
];

let cart = [];

function renderProducts() {
    const list = document.getElementById('product-list');
    list.innerHTML = '';
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        const isInCart = cart.some(item => item.id === product.id);
        const buttonText = isInCart ? '已在購物車' : '加入購物車';
        const buttonClass = isInCart ? 'in-cart' : '';
        
        div.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.desc}</p>
            <div class="price">$${product.price}</div>
            <button class="${buttonClass}" data-id="${product.id}" ${isInCart ? 'disabled' : ''}>${buttonText}</button>
        `;
        list.appendChild(div);
    });
    // 綁定加入購物車按鈕
    document.querySelectorAll('.product button').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(btn.getAttribute('data-id'));
            addToCart(id);
        });
    });
}

function addToCart(id) {
    // 檢查商品是否已在購物車中
    const existingItem = cart.find(i => i.id === id);
    if (existingItem) {
        // 如果商品已在購物車中，不允許重複添加
        return;
    }
    
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
    updateCartCount();
    renderProducts(); // 重新渲染商品列表以更新按鈕狀態
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.reduce((sum, i) => sum + i.qty, 0);
}

function renderCart() {
    const ul = document.getElementById('cart-items');
    ul.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name} x ${item.qty}</span>
            <span>$${item.price * item.qty}</span>
            <button class="remove-item" data-id="${item.id}">移除</button>
        `;
        ul.appendChild(li);
    });
    document.getElementById('cart-total').textContent = `$${total}`;
    // 綁定移除按鈕
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            removeFromCart(id);
        });
    });
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartCount();
    renderCart();
    renderProducts(); // 重新渲染商品列表以更新按鈕狀態
}

// 綁定固定在右下角的購物車按鈕
document.getElementById('cart-btn').addEventListener('click', () => {
    renderCart();
    document.getElementById('cart-modal').classList.remove('hidden');
});

document.getElementById('close-cart').addEventListener('click', () => {
    document.getElementById('cart-modal').classList.add('hidden');
});

// 初始化
renderProducts();
updateCartCount(); 