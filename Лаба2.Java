public class lab2 {
    public static void main(String[] args) {
        double x = 1.0;
        double a = 2.0;
        double b = 0.5;

        // Задача 2
        double z2;
        if (x > 0) {
            z2 = ((a + 1) /2)*Math.exp(x);
        } else {
            z2 = Math.cos(b * x + 1);
        }
        System.out.println("Задача 2: y = {(a + 1) / 2 * e^x, x > 0; cos(bx + 1), x <= 0}");
        System.out.printf("Для x = %.2f, y = %.2f%n%n", x, z2);

        // Задача 4
        double z4;
        if (x <= 2) {
            z4 = (a + x * x) / (b + Math.log(Math.abs(x) + 1));
        } else {
            z4 = Math.exp(x) + Math.log(Math.abs(x));
        }
        System.out.println("Задача 4: y = {(a + x^2) / (b + ln(|x| + 1)), x <= 2; e^x + ln|x|, x > 2}");
        System.out.printf("Для x = %.2f, y = %.2f%n%n", x, z4);

        // Задача 6
        double z6;
        if (x <= -1) {
            z6 = a * Math.log10(x * x);
        } else {
            z6 = (b + x * x) / (x * x + a);
        }
        System.out.println("Задача 6: y = {a * lg(x^2), x <= -1; (b + x^2) / (x^2 + a), x > -1}");
        System.out.printf("Для x = %.2f, y = %.2f%n%n", x, z6);

        // Задача 10
        double z10;
        if (x <= 0) {
            z10 = Math.sqrt(Math.exp(x) - 1);
        } else {
            z10 = 1 / (x * x + a);
        }
        System.out.println("Задача 10: y = {sqrt(e^x - 1), x <= 0; 1 / (x^2 + a), x > 0}");
        System.out.printf("Для x = %.2f, y = %.2f%n%n", x, z10);

        // Задача 12
        double z12;
        if (x <= 1) {
            z12 = 2 * x * x + Math.cos(b * x);
        } else {
            z12 = Math.exp(x) + Math.log10(x * x);
        }
        System.out.println("Задача 12: y = {2x^2 + cos(bx), x <= 1; e^x + lg(x^2), x > 1}");
        System.out.printf("Для x = %.2f, y = %.2f%n%n", x, z12);

        // Задача 14
        double z14;
        if (x <= -1) {
            z14 = 0.2 * x * x + (b * x + Math.log(Math.abs(x + 3)));
        } else {
            z14 = b * x * x + Math.log(x + 3);
        }
        System.out.println("Задача 14: y = {0.2x^2 + [bx + ln|x + 3|], x <= -1; bx^2 + ln(x + 3), x > -1}");
        System.out.printf("Для x = %.2f, y = %.2f%n%n", x, z14);
    }
}