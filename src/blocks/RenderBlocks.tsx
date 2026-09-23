import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { ComingSoonBlock } from '@/blocks/ComingSoon/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { homepageComponents } from '@/blocks/Homepage/Components'
import { aboutComponents } from '@/blocks/About/Components'
import { capabilitiesComponents } from '@/blocks/Capabilities/Components'

const blockComponents = {
  ...homepageComponents,
  ...aboutComponents,
  ...capabilitiesComponents,
  archive: ArchiveBlock,
  content: ContentBlock,
  comingSoon: ComingSoonBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  homePath?: string
}> = (props) => {
  const { blocks, homePath } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div
                  className={
                    blockType === 'comingSoon' || blockType in homepageComponents ? undefined : ''
                  }
                  key={block.id || index}
                >
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} homePath={homePath} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
