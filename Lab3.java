import java.util.Scanner;
import java.lang.Math;

public class Lab3 {
    private static final double EPSILON = 1e-10; // Точность вычислений
    private static final int MAX_ITERATIONS = 10000; // Максимальное количество итераций

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Введите номер ряда (1, 2, 3, 9, 10, 11): ");
        int number = scanner.nextInt();

        System.out.print("Введите x: ");
        double x = scanner.nextDouble();

        double result = 0;

        switch (number) {
            case 1: result = series1(x); break;
            case 2: result = series2(x); break;
            case 3: result = series3(x); break;
            case 9: result = series9(x); break;
            case 10: result = series10(x); break;
            case 11: result = series11(x); break;
            default: System.out.println("Неверный номер ряда."); return;
        }

        System.out.println("S = " + result);
    }

    // Ряд 1: S = ∑(-1)^n * (2n * x^(2n+1)) / (2n+1)!
    public static double series1(double x) {
        double sum = 0;
        double term;
        int n = 1;

        do {
            term = Math.pow(-1, n) * (2 * n * Math.pow(x, 2*n+1)) / factorial(2*n+1);
            sum += term;
            n++;
        } while (Math.abs(term) > EPSILON && n < MAX_ITERATIONS);

        return sum;
    }

    // Ряд 2: S = ∑ x^(2n+1) / (2n+1), -1 < x < 1
    public static double series2(double x) {
        if (Math.abs(x) >= 1) {
            System.out.println("Ошибка: |x| должен быть < 1");
            return Double.NaN;
        }

        double sum = 0;
        double term;
        int n = 0;

        do {
            term = Math.pow(x, 2*n+1) / (2*n+1);
            sum += term;
            n++;
        } while (Math.abs(term) > EPSILON && n < MAX_ITERATIONS);

        return sum;
    }

    // Ряд 3: S = ∑ x^(4n+1) / (4n+1), -1 < x < 1
    public static double series3(double x) {
        if (Math.abs(x) >= 1) {
            System.out.println("Ошибка: |x| должен быть < 1");
            return Double.NaN;
        }

        double sum = 0;
        double term;
        int n = 0;

        do {
            term = Math.pow(x, 4*n+1) / (4*n+1);
            sum += term;
            n++;
        } while (Math.abs(term) > EPSILON && n < MAX_ITERATIONS);

        return sum;
    }

    // Ряд 9: S = 2 * ∑ H_n * x^(n+1) / (n+1), где H_n = 1 + 1/2 + ... + 1/n
    public static double series9(double x) {
        if (x < -1 || x >= 1) {
            System.out.println("Ошибка: x должен быть в [-1, 1)");
            return Double.NaN;
        }

        double sum = 0;
        double term;
        int n = 1;
        double harmonic = 0; // H_n

        do {
            harmonic += 1.0 / n; // Вычисляем H_n = 1 + 1/2 + ... + 1/n
            term = harmonic * Math.pow(x, n+1) / (n+1);
            sum += term;
            n++;
        } while (Math.abs(term) > EPSILON && n < MAX_ITERATIONS);

        return 2 * sum;
    }

    // Ряд 10: S = ∑ (-1)^(n-1) * H_n * x^n, где H_n = 1 + 1/2 + ... + 1/n
    public static double series10(double x) {
        if (Math.abs(x) >= 1) {
            System.out.println("Ошибка: |x| должен быть < 1");
            return Double.NaN;
        }

        double sum = 0;
        double term;
        int n = 1;
        double harmonic = 0; // H_n

        do {
            harmonic += 1.0 / n; // Вычисляем H_n = 1 + 1/2 + ... + 1/n
            term = Math.pow(-1, n-1) * harmonic * Math.pow(x, n);
            sum += term;
            n++;
        } while (Math.abs(term) > EPSILON && n < MAX_ITERATIONS);

        return sum;
    }

    // Ряд 11: S = ∑ ((2n+1)!! * x^(2n)) / (2n)!!
    public static double series11(double x) {
        if (Math.abs(x) >= 1) {
            System.out.println("Ошибка: |x| должен быть < 1");
            return Double.NaN;
        }

        double sum = 0;
        double term;
        int n = 0;
        double doubleFactorialOdd = 1; // (2n+1)!!
        double doubleFactorialEven = 1; // (2n)!!

        do {
            if (n == 0) {
                term = 1; // при n=0: (1!! * x^0) / (0!!) = 1
            } else {
                // Обновляем двойные факториалы
                doubleFactorialOdd *= (2*n - 1) * (2*n + 1) / (2*n - 1.0); // (2n+1)!! = (2n-1)!! * (2n-1) * (2n+1) / (2n-1)
                doubleFactorialEven *= (2*n); // (2n)!! = (2n-2)!! * (2n)

                term = (doubleFactorialOdd * Math.pow(x, 2*n)) / doubleFactorialEven;
            }

            sum += term;
            n++;
        } while (Math.abs(term) > EPSILON && n < MAX_ITERATIONS);

        return sum;
    }

    // Вспомогательная функция для вычисления факториала
    public static double factorial(int n) {
        if (n < 0) return 0;
        if (n == 0 || n == 1) return 1;

        double result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
}
