// Класс для простого маркера
class Marker {
    constructor(color, inkPercentage) {
        this.color = color; // Цвет маркера
        this.inkPercentage = inkPercentage; // Количество чернил в процентах
    }

    // Метод для печати текста
    print(text) {
        const inkPerChar = 0.5; // Один не пробельный символ использует 0.5% чернил
        let printableText = '';
        let inkNeeded = 0;

        for (let i = 0; i < text.length; i++) {
            if (text[i] !== ' ') {
                inkNeeded += inkPerChar;
                if (inkNeeded > this.inkPercentage) {
                    break; // Прекращаем печать, если чернил не хватает
                }
            }
            printableText += text[i];
        }

        // Вывод текста с использованием цвета маркера
        const output = document.getElementById('output');
        output.innerHTML += `<span style="color:${this.color};">${printableText}</span><br>`;

        // Обновляем количество чернил
        this.inkPercentage -= inkNeeded;
        this.inkPercentage = Math.max(this.inkPercentage, 0); // Минимум 0% чернил
        return this.inkPercentage;
    }
}

// Класс для заправляемого маркера
class RefillableMarker extends Marker {
    // Метод для заправки маркера
    refill() {
        this.inkPercentage = 100; // Заправляем маркер до 100%
        return this.inkPercentage;
    }
}

// Инициализация маркеров
const simpleMarker = new Marker('blue', 20); // Синий маркер с 20% чернил
const refillableMarker = new RefillableMarker('red', 30); // Красный заправляемый маркер с 30% чернил

// Обработчик печати с простым маркером
document.getElementById('simpleMarkerBtn').addEventListener('click', function() {
    const text = document.getElementById('textToPrint').value;
    const remainingInk = simpleMarker.print(text);
    document.getElementById('simpleInk').innerText = remainingInk.toFixed(2); // Обновляем информацию о чернилах
});

// Обработчик печати с заправляемым маркером
document.getElementById('refillableMarkerBtn').addEventListener('click', function() {
    const text = document.getElementById('textToPrint').value;
    const remainingInk = refillableMarker.print(text);
    document.getElementById('refillableInk').innerText = remainingInk.toFixed(2); // Обновляем информацию о чернилах
});

// Обработчик для заправки маркера
document.getElementById('refillBtn').addEventListener('click', function() {
    const refilledInk = refillableMarker.refill();
    document.getElementById('refillableInk').innerText = refilledInk; // Обновляем чернила после заправки
});
