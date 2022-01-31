import { useRef, useState } from 'react'
import { PX_MOVEMENT } from 'constant'
import { binaryDecision, getRandomInteger } from 'utils'

interface CashOutButtonProps {
  handleCashOut: () => void
}

export default function CashOutButton({ handleCashOut }: CashOutButtonProps) {
  const [positionReferences, setPositionReferences] = useState({
    right: 100,
    bottom: 50
  })
  const [disabled, setDisabled] = useState(false)

  const buttonContainerRef = useRef<HTMLDivElement>(null)

  const handleMovement = (moveButton: boolean, disableButton: boolean) => {
    if (!moveButton && !disableButton) return
    if (disableButton) setDisabled(true)
    if (moveButton) {
      const currentPosition =
        buttonContainerRef.current?.getBoundingClientRect()
      if (currentPosition) {
        const { x, y } = currentPosition
        const { innerHeight, innerWidth } = window
        const allPossibilities = [
          {
            validation: x - PX_MOVEMENT > 0,
            movement() {
              buttonContainerRef.current!.style.right = `${
                positionReferences.right + PX_MOVEMENT
              }px`
              setPositionReferences(currentReferences => ({
                ...currentReferences,
                right: currentReferences.right + PX_MOVEMENT
              }))
            }
          },
          {
            validation: x + PX_MOVEMENT < innerWidth,
            movement() {
              buttonContainerRef.current!.style.right = `${
                positionReferences.right - PX_MOVEMENT
              }px`
              setPositionReferences(currentReferences => ({
                ...currentReferences,
                right: currentReferences.right - PX_MOVEMENT
              }))
            }
          },
          {
            validation: y - PX_MOVEMENT > 0,
            movement() {
              buttonContainerRef.current!.style.bottom = `${
                positionReferences.bottom + PX_MOVEMENT
              }px`
              setPositionReferences(currentReferences => ({
                ...currentReferences,
                bottom: currentReferences.bottom + PX_MOVEMENT
              }))
            }
          },
          {
            validation: y + PX_MOVEMENT < innerHeight,
            movement() {
              buttonContainerRef.current!.style.bottom = `${
                positionReferences.bottom - PX_MOVEMENT
              }px`
              setPositionReferences(currentReferences => ({
                ...currentReferences,
                bottom: currentReferences.bottom - PX_MOVEMENT
              }))
            }
          }
        ]
        const realPossibilities = allPossibilities.filter(
          possibility => possibility.validation
        )
        const randomChosenPossibility =
          realPossibilities[getRandomInteger(0, realPossibilities.length)]
        randomChosenPossibility.movement()
      }
    }
  }

  return (
    <div
      className="cash-out-button-container"
      onMouseEnter={() => {
        const moveButton = binaryDecision(0.5)
        const disableButton = binaryDecision(0.4)
        handleMovement(moveButton, disableButton)
      }}
      ref={buttonContainerRef}
    >
      <button
        className="game__button cash-out-button"
        type="button"
        disabled={disabled}
        onClick={handleCashOut}
      >
        CASH OUT
      </button>
    </div>
  )
}
