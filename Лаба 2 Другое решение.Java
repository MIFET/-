import java.util.Scanner;
import java.lang.Math;

public class FunctionCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Введите номер функции (1, 2, 3, 9, 10, 11): ");
        int number = scanner.nextInt();
        System.out.print("Введите x: ");
        double x = scanner.nextDouble();
        System.out.print("Введите параметр a: ");
        double a = scanner.nextDouble();
        System.out.print("Введите параметр b: ");
        double b = scanner.nextDouble();

        double result = 0;
        switch (number) {
            case 1: result = function1(x, a, b); break;
            case 2: result = function2(x, a, b); break;
            case 3: result = function3(x, a, b); break;
            case 9: result = function9(x, a, b); break;
            case 10: result = function10(x, a, b); break;
            case 11: result = function11(x, a, b); break;
            default: System.out.println("Неверный номер функции."); return;
        }
        System.out.println("y = " + result);
    }

    // №1
    public static double function1(double x, double a, double b) {
        if (x <= 3) {
            if (x == 0) return Double.NaN; // Проверка для ln|x|
            return b + 2 * Math.log(Math.abs(x));
        } else {
            return (x * x) / (x * x + a);
        }
    }

    // №9
    public static double function9(double x, double a, double b) {
        if (x >= 2) {
            if (a * x < 0) return Double.NaN; // Проверка корня из отрицательного числа
            return Math.sqrt(1 + x * Math.sqrt(a * x));
        } else {
            return a * Math.sin(b * x) + 3;
        }
    }

    // №2
    public static double function2(double x, double a, double b) {
        if (x > 0) {
            return a + 0.5 * Math.exp(-x);
        } else {
            return Math.cos(b * x + 1);
        }
    }

    // №10
    public static double function10(double x, double a, double b) {
        if (x <= 0) {
            double exponent = Math.exp(2 * x - b);
            if (exponent - 1 < 0) return Double.NaN; // Проверка корня
            return Math.sqrt(exponent - 1);
        } else {
            return 1 / (x * x + a);
        }
    }

    // №3
    public static double function3(double x, double a, double b) {
        if (x <= 1) {
            return 1 / (a * a + x * x);
        } else {
            if (x == 0) return Double.NaN; // Проверка для ln|x|
            return b * Math.log(Math.abs(x));
        }
    }

    // №11
    public static double function11(double x, double a, double b) {
        if (x > 4) {
            if (a + Math.abs(Math.sin(x)) < 0) return Double.NaN; // Проверка корня
            return Math.sqrt(a + Math.abs(Math.sin(x)));
        } else {
            return Math.tan(b * x);
        }
    }
}