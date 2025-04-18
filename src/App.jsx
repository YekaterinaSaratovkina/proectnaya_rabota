import { RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Router from "./constans/Router";

const queryCline = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryCline}>
        <RouterProvider router={Router} />
      </QueryClientProvider>
    </>
  )
}

export default App
/*
-переход на домашнюю страницу при нажатии на логотип
-сделать вывод данных по поиску
-Заполнить sidebar фильтрами(жанр, год, кинокомпания?)
-вывод данных по фильтрам
-страница подробнее о фильме
-кнопка назад на подробной информации
-оформить домашнюю страницу
-добавление в избранное
-удаление из избранного
-переход на страницу избранного при нажатии на иконку
-вывод избранных товаров на страницу Favorites

дополнительно:
-
-возможность поставить лайк/дизлайк
-возможность поставить оценку

*/