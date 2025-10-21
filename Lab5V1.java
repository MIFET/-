import java.util.Arrays;
import java.util.Scanner;

// Класс для хранения информации о фильме
class Film {
    // Поля класса (инкапсуляция)
    private String title;
    private int year;
    private String country;
    private String genre;
    private double rentalPrice;

    // Конструктор
    public Film(String title, int year, String country, String genre, double rentalPrice) {
        this.title = title;
        this.year = year;
        this.country = country;
        this.genre = genre;
        this.rentalPrice = rentalPrice;
    }

    // Геттеры (методы для доступа к полям)
    public String getTitle() { return title; }
    public int getYear() { return year; }
    public String getCountry() { return country; }
    public String getGenre() { return genre; }
    public double getRentalPrice() { return rentalPrice; }

    // Сеттеры (методы для изменения полей)
    public void setTitle(String title) { this.title = title; }
    public void setYear(int year) { this.year = year; }
    public void setCountry(String country) { this.country = country; }
    public void setGenre(String genre) { this.genre = genre; }
    public void setRentalPrice(double rentalPrice) { this.rentalPrice = rentalPrice; }

    // Метод для вывода информации о фильме
    @Override
    public String toString() {
        return String.format("Название: %s, Год: %d, Страна: %s, Жанр: %s, Стоимость проката: %.2f",
                title, year, country, genre, rentalPrice);
    }
}

public class Lab5V1 {
    private static Scanner scanner = new Scanner(System.in);
    private static Film[] films; // Массив объектов Film

    public static void main(String[] args) {
        System.out.println("=== Система управления фильмами ===");

        // Инициализация массива фильмов
        initializeFilms();

        // Главное меню
        boolean running = true;
        while (running) {
            printMenu();
            int choice = scanner.nextInt();
            scanner.nextLine(); // очистка буфера

            switch (choice) {
                case 1:
                    showAllFilms();
                    break;
                case 2:
                    findFilmsAboveAveragePrice();
                    break;
                case 3:
                    findEarliestFilm();
                    break;
                case 4:
                    sortFilmsByTitle();
                    break;
                case 5:
                    searchAndEditFilm();
                    break;
                case 0:
                    running = false;
                    System.out.println("Выход из программы...");
                    break;
                default:
                    System.out.println("Неверный выбор!");
            }
        }
    }

    // Инициализация массива фильмов тестовыми данными
    private static void initializeFilms() {
        films = new Film[] {
                new Film("Матрица", 1999, "США", "фантастика", 1500.50),
                new Film("Крестный отец", 1972, "США", "криминал", 1200.00),
                new Film("Побег из Шоушенка", 1994, "США", "драма", 1000.75),
                new Film("Зеленая миля", 1999, "США", "фэнтези", 1100.25),
                new Film("Форрест Гамп", 1994, "США", "драма", 950.50),
                new Film("Начало", 2010, "США", "фантастика", 1800.00)
        };
        System.out.println("Загружено " + films.length + " фильмов\n");
    }

    // Вывод меню
    private static void printMenu() {
        System.out.println("\n=== МЕНЮ ===");
        System.out.println("1. Показать все фильмы");
        System.out.println("2. Фильмы с ценой проката выше средней");
        System.out.println("3. Самый старый фильм");
        System.out.println("4. Сортировать по названию");
        System.out.println("5. Поиск и редактирование");
        System.out.println("0. Выход");
        System.out.print("Выберите действие: ");
    }

    // Показать все фильмы
    private static void showAllFilms() {
        System.out.println("\n=== ВСЕ ФИЛЬМЫ ===");
        for (int i = 0; i < films.length; i++) {
            System.out.println((i + 1) + ". " + films[i]);
        }
    }

    // Фильмы с ценой проката выше средней
    private static void findFilmsAboveAveragePrice() {
        System.out.println("\n=== ФИЛЬМЫ С ЦЕНОЙ ВЫШЕ СРЕДНЕЙ ===");

        // Вычисление средней стоимости
        double total = 0;
        for (Film film : films) {
            total += film.getRentalPrice();
        }
        double average = total / films.length;

        System.out.printf("Средняя стоимость проката: %.2f\n", average);
        System.out.println("Фильмы с ценой выше средней:");

        for (Film film : films) {
            if (film.getRentalPrice() > average) {
                System.out.println(film);
            }
        }
    }

    // Поиск самого старого фильма
    private static void findEarliestFilm() {
        System.out.println("\n=== САМЫЙ СТАРЫЙ ФИЛЬМ ===");

        Film earliest = films[0];
        for (int i = 1; i < films.length; i++) {
            if (films[i].getYear() < earliest.getYear()) {
                earliest = films[i];
            }
        }

        System.out.println("Самый старый фильм: " + earliest);
    }

    // Сортировка фильмов по названию
    private static void sortFilmsByTitle() {
        System.out.println("\n=== СОРТИРОВКА ПО НАЗВАНИЮ ===");

        // Создаем копию массива для сортировки
        Film[] sortedFilms = Arrays.copyOf(films, films.length);

        // Сортировка пузырьком по названию
        for (int i = 0; i < sortedFilms.length - 1; i++) {
            for (int j = 0; j < sortedFilms.length - i - 1; j++) {
                if (sortedFilms[j].getTitle().compareToIgnoreCase(sortedFilms[j + 1].getTitle()) > 0) {
                    // Обмен местами
                    Film temp = sortedFilms[j];
                    sortedFilms[j] = sortedFilms[j + 1];
                    sortedFilms[j + 1] = temp;
                }
            }
        }

        // Вывод отсортированного массива
        for (int i = 0; i < sortedFilms.length; i++) {
            System.out.println((i + 1) + ". " + sortedFilms[i]);
        }
    }

    // Поиск и редактирование фильма
    private static void searchAndEditFilm() {
        System.out.println("\n=== ПОИСК И РЕДАКТИРОВАНИЕ ===");
        System.out.print("Введите название фильма для поиска: ");
        String searchTitle = scanner.nextLine();

        Film foundFilm = null;
        for (Film film : films) {
            if (film.getTitle().equalsIgnoreCase(searchTitle)) {
                foundFilm = film;
                break;
            }
        }

        if (foundFilm == null) {
            System.out.println("Фильм не найден!");
            return;
        }

        System.out.println("Найден фильм: " + foundFilm);

        // Меню редактирования
        System.out.println("\nКакое поле вы хотите изменить?");
        System.out.println("1. Название");
        System.out.println("2. Год выпуска");
        System.out.println("3. Страна");
        System.out.println("4. Жанр");
        System.out.println("5. Стоимость проката");
        System.out.print("Выберите поле: ");

        int fieldChoice = scanner.nextInt();
        scanner.nextLine(); // очистка буфера

        switch (fieldChoice) {
            case 1:
                System.out.print("Введите новое название: ");
                String newTitle = scanner.nextLine();
                foundFilm.setTitle(newTitle);
                break;
            case 2:
                System.out.print("Введите новый год выпуска: ");
                int newYear = scanner.nextInt();
                foundFilm.setYear(newYear);
                break;
            case 3:
                System.out.print("Введите новую страну: ");
                String newCountry = scanner.nextLine();
                foundFilm.setCountry(newCountry);
                break;
            case 4:
                System.out.print("Введите новый жанр: ");
                String newGenre = scanner.nextLine();
                foundFilm.setGenre(newGenre);
                break;
            case 5:
                System.out.print("Введите новую стоимость проката: ");
                double newPrice = scanner.nextDouble();
                foundFilm.setRentalPrice(newPrice);
                break;
            default:
                System.out.println("Неверный выбор!");
                return;
        }

        System.out.println("\nФильм успешно обновлен!");
        System.out.println("Обновленная информация: " + foundFilm);
    }
}