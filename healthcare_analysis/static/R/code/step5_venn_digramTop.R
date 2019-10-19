venn.plott20 <- venn.diagram(list(top20_insure$State, top20_med$State), NULL,
                            fill=c("blue","orange"), alpha=c(0.8,0.8), cex = 2, 
                            cat.fontface=4, category.names=c("Uninsured", "Medicaid"))
grid.draw(venn.plott20)


venn.plotb20 <- venn.diagram(list(b20_insure$State, b20_med$State), NULL,
                             fill=c("blue","orange"), alpha=c(0.8,0.8), cex = 2, 
                             cat.fontface=4, category.names=c("Uninsured", "Medicaid"))
grid.draw(venn.plotb20)


