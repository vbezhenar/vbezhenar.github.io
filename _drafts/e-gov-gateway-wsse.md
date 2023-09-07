---
title: Добавление и проверка ЭЦП при работе с ШЭП в Казахстане
---

Краткое описание и примеры кода на Java для добавления и проверки ЭЦП при работе
с шлюзом электронного правительства в Казахстане.

## Подготовка

Для использования алгоритмов ГОСТ необходим набор библиотек kalkan от НУЦ РК. В
свободном доступе их нет, для получения SDK необходимо связаться с НУЦ РК
([Разработчикам](https://pki.gov.kz/developers/)). В данной статье используется
SDK от 27.03.2023.

Примеры кода написаны на Java 17 и используют библиотеки Apache Santuario и
Apache WSS4J. На момент написания статьи последнии версии библиотек kalkan-ом не
поддерживались.

## Создание проекта