# Build a Report Slideshow

This section explains how to build each atomic piece of a Report Slideshow. To see top-level configurations for a Report Slideshow, please see the previous document.

## The Build icon

On the main Report Slideshows table, look at the leftmost column for your slideshow in question, called `Slideshow Commands` or `Commands`. In this column, you will see two icons:
* A play button icon
* A toolbox icon

Click the slideshow's toolbox icon to navigate to the Report Slideshow's build page.

<p align="center">
  <img src="./build-slideshow-button.png" />
</p>

::: tip
If you are unsure of what each button does in the `Slideshow Commands` column, just hover your mouse over the button in question and a small tooltip should appear on your screen explaining what the button does.
:::

::: warning
If you click the play button icon in the `Slideshow Commands` column *before you build an actual slideshow*, you will be navigated to the slideshow build page and asked to build a slideshow.
:::

## The Build Slideshow Page

Upon navigating to this page, you will see three main components:
* A slideshow items table which will be empty if you're building your slideshow for the first time.
* A slideshow controls panel below the table.
* Your target Power BI report embedded onto the page below the slideshow controls panel.

<p align="center">
    <img src="./build-slideshow-page-empty.png" />
</p>

As you build slideshow items, they will appear in the slideshow items table at the top.

## Create Slideshow Item

To create a new slideshow item, click the `+` button at the upper-right corner of the table. When you do so, a slideshow item popup will appear. Within this popup, can must specify what exact slideshow item you want to build as well as assign custom configurations to it.

<p align="center">
    <img src="./create-slideshow-item-popup.png" />
</p>

## Slideshow Item Configurations

The configurations for a slideshow item are below:
* `Name`: an optional name to assign to the slideshow item.
* `Nav Item Type`: the type of the slideshow item. Currently there are two slideshow item types supported:
    * A report page/tab
    * A report bookmark

::: warning
Recall that a **report** bookmark is built into the actual Power BI report file itself and is not the same as a **personal** bookmark.
:::

* `Nav Item ID`: the name of the slideshow item. It will be the name of either a report page/tab or a report bookmark.

::: tip Hidden Report Pages
Dispagent will indicate hidden pages/tabs by appending the word `(hidden)` onto the end of the name.
:::

* `Duation (s)`: the duration, in seconds, that the slideshow item should be displayed when the slideshow is launched.

After choosing each configuration, click the `Save` button. Upon doing so, you should see the entire page refresh with the new slideshow item appearing in the slideshow items table at the top; you will also see the Power BI report re-embed itself onto the page.

## Slideshow Item Ordering

After building each of your slideshow items, you can assign an ordering to them. This is extremely easy and user-friendly to do.

To arrange the slideshow items, simply grab their row by clicking the drag icon on the far-left of the slideshow items table. Then, simply drag the row up or down on the slideshow items table. Upon releasing the row to its new position, the ordering will by *dynamically recalculated* for all slideshow items in the table.

<p align="center">
    <img src="./drag-slideshow-item-row.png" />
</p>