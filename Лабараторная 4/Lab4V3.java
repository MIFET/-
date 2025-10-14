import java.util.Arrays;
import java.util.Scanner;

public class Lab4V3 {

    /**
     * Выполняет сглаживание массива по алгоритму:Алгоритм работает за O(n) времени
     * и O(1) памяти, используя накопленную сумму для вычисления средних значений.
     * Каждый элемент A[k] заменяется средним арифметическим элементов от A[0] до A[k] включительно.
     * @param array Входной массив (будет изменен)
     */
    public static void smoothArray(double[] array) {
        if (array == null || array.length == 0) {
            return;
        }

        double runningSum = 0;
        for (int i = 0; i < array.length; i++) {
            runningSum += array[i];
            array[i] = runningSum / (i + 1);
        }
    }

    /**
     * Ввод массива с клавиатуры
     */
    public static double[] inputArray() {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Введите размер массива N: ");
        int n = scanner.nextInt();

        double[] array = new double[n];
        System.out.println("Введите " + n + " элементов массива:");

        for (int i = 0; i < n; i++) {
            System.out.print("A[" + i + "] = ");
            array[i] = scanner.nextDouble();
        }

        return array;
    }

    /**
     * Вывод массива на экран
     */
    public static void printArray(double[] array) {
        System.out.println("Массив: " + Arrays.toString(array));
    }

    // Демонстрация работы
    public static void main(String[] args) {
        System.out.println("=== Программа сглаживания массива ===");

        // Ввод массива
        double[] array = inputArray();

        System.out.println("\nДо сглаживания:");
        printArray(array);

        // Сглаживание
        smoothArray(array);

        System.out.println("\nПосле сглаживания:");
        printArray(array);

        // Демонстрация на тестовых данных
        System.out.println("\n=== Тестовый пример ===");
        double[] testArray = {1.0, 2.0, 3.0, 4.0, 5.0};

        System.out.println("Исходный тестовый массив: " + Arrays.toString(testArray));

        smoothArray(testArray);

        System.out.println("Сглаженный тестовый массив: " + Arrays.toString(testArray));
    }
}