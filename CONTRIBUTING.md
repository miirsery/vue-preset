# Dashboard

## Vue 3

## Наименование директорий

Директории именуются в стиле `camelCase`. Пример: `user`, `userDetail`

---
---

### Vue components

- Для именования компонентов (название тегов) использовать 2 или более слова во избежание коллизий с нативным HTML
- Для именования файлов и папок, группирующие файлы одной сущности, использовать PascalCase. Имя компонента должно состоять из полных слов (без сокращений)

- componentsExampleFolder
  - atoms
    - MyComponent
      - MyComponent.vue
    - MyGroupComponent
      - MyGroupComponent.const.ts - полезные константы
      - MyGroupComponent.utility.ts - полезные методы
      - MyGroupComponent.locale.ts - файл переводов
      - MyGroupComponent.type.ts - описание типов
      - MyGroupComponent.vue

- Наименование компонентов в template используется в стиле `kebab-case`:

```html
<my-component v-model="model" ... />
```

- Используем синтаксический сахар `<script setup>`, рекомендуемый при Composition API внутри SFC

- Локальная стилизация компонента находится в нём же (паттерн SFC) и не затрагивает внешние модули (scoped)

```scss
<style scoped>
  .some-class {}
</style>
```

### Code style

- Шаблон компонента должен быть максимально чистым (за исключением самостоятельных компонентов)
- Методы-обработчики именуются: `handle{{цель}}{{действие}}`. Пример: `handleUserChange`.
- Методы-предикаты именуются: `is{{цель}}{{условие}}`. Пример: `isModalVisible`.
- Методы-действия именуются: `{{глагол}}{{контекст}}`. Пример: `getUser`, `generateStyle` и т.д. Так же глагол должен использоваться один и тот же во всех методах-действиях одного типа. Например, получение чего-либо - всегда `get...`, не использовать синонимы, по типу `take` и прочие. Если `generate` - всегда `generate`, не нужно мешать с, например, `make`.

- В скрипте определённый порядок (сверху вниз) описания переменных, методов и т. д., а именно:

  - model
  - props
  - data
  - computed
  - watch
  - lifecycle hooks:
    - onServerPrefetch
    - onActivated
    - onBeforeMount
    - onMounted
    - onBeforeUpdate
    - onUpdated
    - onDeactivated
    - onBeforeUnmount
    - onUnmounted
    - onErrorCaptured
  - methods

- Стрелочные функции, имея даже один входной параметр, записываются в скобках. Пример: `someMethod: (parameter) => { ... }`

```html
<template>
  <div class="some-class">
    <div>
      <span> Пользователь: {{ userWithId }} </span>
    </div>
    <button @click="changeUserHandler"> Click to change user </button>
  </div>
</template>

<script setup lang="ts">
  import { ref, onServerPrefetch, onMounted } from 'vue'

  type Props = {
    // some params...
  }

  type Emits = {
    // some params...
  }

  const props = defineProps<Props>()
  // Опционально, если надо дефолтные значения указать
  // const props = withDefaults(defineProps<Props>(), {
  //   // some params...
  // })
  const emit = defineEmits<Emits>()

  const user = 'Пользователь'
  let id = ref(1)

  const userWithId = computed(() => `${user} ${id}`)

  onServerPrefetch(() => {
    // some logic...
  })

  onMounted(() => {
    //some logic...
  })

  const changeUserHandler = () => {
    id.value += 1
  }
</script>

<style scoped lang="scss">
  .some-class {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
```

### Как писать сопровождения по коду участникам команды для будущих правок

В случае с HTML, коментирование вёрстки, только в том случае, если была задача "Временно скрыть/вырезать из функционала". Всё что не попадает под это определение - удалять, будет отдельная задача по внедрению/возвращению при необходимости

```html
<!-- TYPE: TASK-ID description -->
<!-- <div /> -->
```

```ts
// TYPE: TASK-ID description

/**
 * TYPE: TASK-ID 
 * description
 */
```

- TYPE: `FIXME:` или `TODO:`
- TASK-ID: номер задачи в рамках которой писался комментарий
- description: краткое описание, но передающее основной смысл. Писать так, чтобы другой человек понял ваш комментарий. Не приветствуются комментарии следующего содержания `не забыть поправить` или `Петя сказал, что поправит это своим МР` (не указана цель правки).

### Ссылки

- [Style Guide (Ru)](https://v3.ru.vuejs.org/ru/style-guide/) (обязательно к прочтению)
- [Composition API](https://vuejs.org/api/options-composition.html)
- [Tips & Best Practices](https://medium.com/js-dojo/vue-3-tips-best-practices-54aec91d95dc)
- [6 Tips for Building Large Scale Applications](https://vueschool.io/articles/vuejs-tutorials/6-tips-for-building-large-scale-vue-js-3-applications/)
- [Script setup](https://vuejs.org/api/sfc-script-setup.html#script-setup)

---

---

## TypeScript

На проекте используется TypeScript.

Стараемся типизировать всё (`any` не приветствуется (P.S. если тип неизвестен, лучше использовать `unknown`, чем `any`)). Если есть место, где по каким-то причинам получается использовать только `any`, то лучше этот момент описать или вынести на обсуждение (при необходимости).

### Ссылки

- [TypeScript](https://www.typescriptlang.org/docs/)
- [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [Creating Types from Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)

---

---
## Стили

Общие и абстрактные стили проекта описаны в директории `src/styles/`:

- `index.scss` - Файл в котором собраны все файлы со стилями
- `_base.scss` - Общие стили проекта
- `_font.scss` - Подключенные шрифты проекта
- `resources/` - Абстрактные стили проекта (переменные, миксины и функции):
  - `mixins/` - Вспомогательные миксины и функции
  - `variables/` - Переменные и списки
- `vendor/` - Стили подключаемых библиотек

Webpack (style-resource-loader) прокидывает указанные стили в весь проект (`patterns: ['./src/styles/resources/variables/index.scss', './src/client/style/resources/mixins/index.scss']`)

> Все абстрактные стили доступны в компонентах по-умолчанию!

### Ссылки

- [Scss Documentation (Ru)](https://sass-scss.ru/documentation/)
- [Scss Documentation](https://sass-lang.com/documentation)
- [Scss Playground](https://www.sassmeister.com/)

---

---

## Требования к Стилям

В проекте используется препроцессор SСSS и методология BEM

### Именование классов

`block-name__item-name--modificator`

Пример:

```html
<div class="product-card">
  <div class="product-card__header">
    <h2>Header</h2>
  </div>
  <div class="product-card__info">
    <span>Info</span>
  </div>
  <div class="product-card__price product-card__price--hidden">
    <span>1000</span>
  </div>
</div>
```

### Styles

Избегайте использование `!important`, линтеры будут выкидывать warning. Если не удаётся отказаться от него: добавляем исключение и описываем почему используем:

```scss
.input {
  // описываем почему используем !important
  content: none !important; /* stylelint-disable-line declaration-no-important */
}
```

### Именование переменных

Название переменной формируется: `$property-prefix--property`

Пример: `$color--primary`, `$color--font-secondary`

### Глобальные классы

На проекте присутствуют глобальные классы (`src/styles/resources/...`)

- Отступы: `{{вид_отступа}}-{{размер_экрана_если_требуется}}-{{размер_отступа}}`. Пример: `m-4`, `ml-4`, `ml-lg-4`, `p-4`, `pl-4`, `pl-lg-4`
- Цвета: `{{вид_заливки}}-{{наименование_цвета}}`. Пример: `color-primary`, `bg-font-secondary`
- Не используем в проекте `font-weight`, `font-size` и `font-family`, вместо этого используем абстрактные классы `.h1`, `.text-sm`, `.bold` и т. д.
- В svg-файлах в заливку (fill) ставить `currentColor`

---

---

# Git

## Ветки и коммиты

Название ветки формируется:

`TASK-ID`

- TASK-ID - Id задачи в Jira, без каких либо вложенностей (такие как: `feat/CP-1111` не приветствуются, просто `CP-1111`)

Коммит формируется:

`TASK-ID | description`

- TASK-ID - Id задачи в Jira
- description - краткое описание изменений

---

---

## Merge requests

Merge request формируется:

`Draft: TYPE: TASK-ID | description`

- Draft - Указывает, что МР не должен временно мёржиться с целевой веткой. В случае ненадобности - удалить
  
  `TYPE: TASK-ID | description`
- TYPE:
  - **feat**：Новые фичи
  - **fix**：bugfix
  - **docs**：Обновление документации
  - **style**：Модификации кода, не влияющие на логику программы (изменение пробельных символов, форматирование отступов, заполнение отсутствующих точек с запятой и т. д. без изменения логики кода)
  - **refactor**：Рефакторинг кода (ни новых функций, ни исправлений ошибок)
  - **perf**：Производительность, оптимизация
  - **test**：Добавление новых тестов или обновление существующих
  - **build**：Основная цель - изменить фиксацию системы сборки проекта (например, глюк, новый веб-пакет, конфигурация накопительного пакета и т.д.).
  - **ci**：Основная цель - изменить коммиты, в которых проект продолжает процесс интеграции (например, Travis, Jenkins, GitLab CI, Circle и т. д.).
  - **chore**：Другие типы, не принадлежащие к указанным выше типам
  - **revert**：Откатить предыдущий коммит
- TASK-ID - Id задачи в Jira
- description - полное название задачи в Jira (заголовок)

> MR не должен быть идеальным, но он должен улучшать кодовую базу. Т.е с каждым привносимым изменением код должен становиться лучше и лучше. Если MR добавляет много хорошего, не нужно придираться к мелочам — выгоднее, чтобы это улучшение попало в код побыстрее. Никакой MR не должен делать код хуже. Единственное исключение — это если MR является срочным фиксом чего-нибудь.

Требования к MR:

- В описании кратко изложить суть данного изменения/нововведения;
- MR должен иметь код только по задаче указанной в теме.
- При создании MR ставить галочку `Squash commits when merge request is accepted`

Проверка MR должна проходить в течение 24 часов.

Не значительные для задачи аспекты можно вынести в тех.долг.

### Если ревьюер и автор MR не согласны друг с другом

Необходимо попытаться достигнуть консенсуса в комментариях к MR. Если этого сделать не получается - личное обсуждение или привлечение членов команды. Главное — MR не должен застревать надолго!

### Порядок проведения MR

- Обязательно проинформируйте автора, что Вы начали проверять MR или отложили его проверку (Добавить в начало заголовка MR флаг `Draft:`)
- Сначала анализируем MR (необходимость в целом, структура)
- Затем проверяем основной код, второстепенные файлы пока пропускаем
- Далее проверяем оставшиеся файлы

### На что обращать внимание при проведении MR

- Код хорошо спроектирован (не переусложнен, легко читаемый)
- Имеет необходимую функциональность (с точки зрения пользователей)
- Учтены все нюансы параллельного программирования (если есть)
- Разработчик не оверинженерит: не нужно писать код, который может не понадобиться
- Линтеры успешно проходят (eslint, stylelint)
- Есть хорошо спроектированные тесты
- Комментарии к коду понятны и необходимы (объясняют, почему так сделано, а не как)

### Как писать комментарии на код ревью

- Нужно быть вежливым, не переходить на личности
- Объяснять автору, почему необходимо это исправить
- Помочь понять проблему (стратегическая выгода) или предоставить готовое решение (тактическая выгода)
- Незначительные (не обязательные) замечания, можно помечать префиксом nit: от англ. nitpick (придирка)`
- Если необходимо отложить правки: заведите задачу и добавьте TODO указав эту задачу (если правка не большая - просто заведите TODO).
