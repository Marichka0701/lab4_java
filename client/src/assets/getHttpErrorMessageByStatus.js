export const getHttpErrorMessageByStatus = (error) => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                return 'Неправильний email або пароль';
            case 403:
                return 'У вас немає доступу до цього ресурсу';
            case 404:
                return 'Ресурс не знайдено';
            case 409:
                return 'Користувач з таким email вже існує';
            case 429:
                return 'Забагато спроб. Будь ласка, спробуйте пізніше';
            case 500:
                return 'На сервері сталася помилка. Будь ласка, спробуйте пізніше';
        }
    } else if (error.request) {
        return `Немає відповіді від сервера. Будь ласка, перевірте своє інтернет-з'єднання`;
    }
}