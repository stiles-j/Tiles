function getIndex(tile, array, arrayRows, arrayColumns)
{
	var i, j;
	var index;
    
    /*nested loop to itterate through the 2d array*/
    for(i = 0; i < arrayRows; i++)
	{
		  for (j = 0; j < arrayColumns; j++)
		  {
              if (array[i][j] == tile)
			  {
                /*if we have a match, save the index in an array of its own and return the array */
				index = [i, j];
				return index;
              } /* end if */
          } /* end for j */
    } /* end for i */

    /*if we made it this far, the tile is not in the array so retun a bogus result*/
    index = [-1, -1];
    return index;

} /* end getIndex */




function checkForNull(tile, myArray)
{
    /*first get the index of the tile and the null*/
    var tileLocation = getIndex(tile, myArray, 3, 3);
    var nullLocation = getIndex(0, myArray, 3, 3);
    
    /*if the row data are the same, retrun 1 to indicate they are in the same row*/
    if (tileLocation[0] == nullLocation[0])
    {
        return 1;
    }/*end if*/
    /*if the column locations are the same, return 2 indicating same column*/
    else if (tileLocation[1] == nullLocation[1])
    {
        return 2;
    }/*end else if*/
    /*if both the above fail, the tile is not in the same column or row as the null */
    else
        return 0;
} /*end check for null */




function shiftRow (tile, myArray)
{
    /*Declare variables, and initialize with the indexes of the null and the reference tile*/
    var nullIndex = getIndex(0, myArray, 3, 3);
    var tileIndex = getIndex(tile, myArray, 3, 3);
    var row = nullIndex[0];
    var direction;
    
    /*If the null index[1] is greater than that of tileIndex[1], shift the null right until that is no longer the case */
    if (nullIndex[1] > tileIndex[1])
    {
        while (nullIndex[1] > tileIndex[1])
        {
            direction = 1;
            /*shift the token next to the null right one spot*/
            myArray[row][nullIndex[1]] = myArray[row][nullIndex[1]-1];
            /*shift the tile related to the token right*/
            shiftGraphicRow(myArray[row][nullIndex[1]-1], direction);
            /*put the null where the token that just moved was*/
            myArray[row][nullIndex[1]-1] = 0;
            nullIndex[1]--;
        }/*end while*/
        
    }/*end if*/
    /*Otherwise, if nullIndex[1] is less than tileIndex[1], shift the null left until that is not the case.*/
    else
    {
        while (nullIndex[1] < tileIndex[1])
        {
            direction = -1;
            /*shift the adjacent token left one spot*/
            myArray[row][nullIndex[1]] = myArray[row][nullIndex[1]+1];
            /*shift the tile related to the token left*/
            shiftGraphicRow(myArray[row][nullIndex[1]+1], direction);
            /*put the null in the space the token vacated*/
            myArray[row][nullIndex[1]+1] = 0;
            nullIndex[1]++;
        }/*end while*/
    }/*end else*/
    
}/*end shiftRow*/




function shiftColumn(tile, myArray)
{
    /*declare variables and initialize the index of the tile and null*/
    var nullIndex = getIndex(0, myArray, 3, 3);
    var tileIndex = getIndex(tile, myArray, 3, 3);
    var col = nullIndex[1];
    var direction;
    
    /*If the null is on a higher number row than then the tile (physically lower), shift the null up until that is not the case*/
    if (nullIndex[0] > tileIndex[0])
    {
        while (nullIndex[0] > tileIndex[0])
        {
            direction = 1;
            /*shift the token adjacent to the null down*/
            myArray[nullIndex[0]][col] = myArray[nullIndex[0]-1][col];
            /*shift the tile associated with the token*/
            shiftGraphicColumn(myArray[nullIndex[0]-1][col], direction);
            /*put the null where the token just was */
            myArray[nullIndex[0]-1][col] = 0;
            nullIndex[0]--;
            
        }/*end while*/
    }/*end if*/
    /*otherwise shift the null down until it is no longer higher than the tile*/
    else
    {
        while (nullIndex[0] < tileIndex[0])
        {
            direction = -1;
            /*shift the token adjacent to the null up one space*/
            myArray[nullIndex[0]][col] = myArray[nullIndex[0]+1][col];
            /*shift the graphic tile associated with the token*/
            shiftGraphicColumn(myArray[nullIndex[0]+1][col], direction);
            /*put the null where the token that just moved was*/
            myArray[nullIndex[0]+1][col] = 0;
            nullIndex[0]++;
        }/*end while*/
        
    }/*end else*/
    
}/*end shiftColumn*/




function printArray(theArray)
{
    /*declare variables*/
    var i = 0;
    var j = 0;
    
    for (i = 0; i < 3; i++)
    {
        for (j = 0; j < 3; j++)
        {
            document.write(theArray[i][j] + " ");
        }/*end for j*/
        document.write("<br>");
    }/*end for i*/
    document.write("<br><br>");
}/*end printArray()*/




function shiftGraphicRow(tile, direction)
{
    /*declare variables */
    var step = 77 * direction;
    
    /*Use the animate function to move the tile horizontally by step pixels*/
    $('#'+tile).animate({left: '+=' + step +'px'}, 250);

}/*end shiftGraphicRow*/




function shiftGraphicColumn(tile, direction)
{
    /*declare variables */
    var step = 77 * direction;
    
    /*use the animate function to move the tile vertically by step pixels*/
    $('#'+tile).animate({top: '+=' + step +'px'}, 250);
}/*end shiftGraphicColumn*/




function winCheck (playerArray)
{
    /*declare variables*/
    var winArray = [['n8', 'n7', 'n6'],
                    ['n5', 'n4', 'n3'],
                    ['n2', 'n1', 0]
                    ];
    var i;
    var j;
    
    /*use a nested loop to see if the player array matches the victory array*/
    for (i = 0; i < 3; i++)
    {
        for(j = 0; j < 3; j++)
        {
            /*if this element matches keep on checking */
            if (playerArray[i][j] == winArray[i][j])
                continue;
            /*but if it doesn't, stop, and return false*/
            else
                return 0;
        }/*end for j*/
    }/*end for i*/
    
    /*if we made it this far, then the two arrays matched so return true*/
    return 1;
    
}/*end winCheck*/




function errorFlash(tile)
{
    $('#'+tile).css({'background-color': 'rgb(255, 100, 100)', 'color': 'white'});
    setTimeout(function(){ 
               $('#'+tile).css({'background-color': 'rgb(255, 255, 255)', 'color': 'rgb(200, 150, 100)'})}, 100); 
}/*end errorFlash*/




function interface(e, gameArray)
{
                    var validMove = 0;
                    
                    validMove = checkForNull(e.target.id, gameArray);
                    if (validMove == 1)
                    {
                        shiftRow(e.target.id, gameArray);
                    }/*end if*/
                    
                    else if (validMove == 2)
                    {
                        shiftColumn(e.target.id, gameArray);
                    }/*end if*/
                    else if (validMove == 0)
                    {
                        errorFlash(e.target.id);
                    }/*end else*/
                
} /*end interface*/